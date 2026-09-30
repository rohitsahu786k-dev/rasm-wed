<?php
/**
 * Plugin Name: Rasm Agent Store
 * Description: Stores the AI SEO agent's audit log, usage ledger and reports in this site's own MySQL database (custom table), exposed through authenticated REST endpoints. No data leaves WordPress.
 * Version: 1.0.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

const RASM_AGENT_DB_VERSION = '1';

function rasm_agent_table() {
    global $wpdb;
    return $wpdb->prefix . 'rasm_agent';
}

function rasm_agent_install() {
    global $wpdb;
    $table   = rasm_agent_table();
    $charset = $wpdb->get_charset_collate();
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    // collection: log stream name ("ai_actions", "ai_usage", ...) or "kv:<key>" for single JSON documents.
    dbDelta("CREATE TABLE {$table} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        collection VARCHAR(64) NOT NULL,
        ts DATETIME NOT NULL,
        data LONGTEXT NOT NULL,
        PRIMARY KEY (id),
        KEY collection_ts (collection, ts)
    ) {$charset};");
    update_option('rasm_agent_db_version', RASM_AGENT_DB_VERSION);
}
register_activation_hook(__FILE__, 'rasm_agent_install');
add_action('plugins_loaded', function () {
    if (get_option('rasm_agent_db_version') !== RASM_AGENT_DB_VERSION) {
        rasm_agent_install();
    }
});

function rasm_agent_can() {
    return current_user_can('manage_options');
}

function rasm_agent_valid_collection($c) {
    return is_string($c) && preg_match('/^(kv:)?[a-zA-Z0-9_-]{1,60}$/', $c) === 1;
}

add_action('rest_api_init', function () {
    $ns = 'rasm-agent/v1';

    register_rest_route($ns, '/ping', [
        'methods'             => 'GET',
        'permission_callback' => 'rasm_agent_can',
        'callback'            => function () {
            return ['ok' => true, 'version' => RASM_AGENT_DB_VERSION];
        },
    ]);

    // Append a record to a log collection.
    register_rest_route($ns, '/append', [
        'methods'             => 'POST',
        'permission_callback' => 'rasm_agent_can',
        'callback'            => function (WP_REST_Request $r) {
            global $wpdb;
            $collection = $r->get_param('collection');
            $record     = $r->get_param('record');
            if (!rasm_agent_valid_collection($collection) || strpos($collection, 'kv:') === 0 || !is_array($record)) {
                return new WP_Error('bad_request', 'invalid collection or record', ['status' => 400]);
            }
            $ok = $wpdb->insert(rasm_agent_table(), [
                'collection' => $collection,
                'ts'         => gmdate('Y-m-d H:i:s'),
                'data'       => wp_json_encode($record),
            ]);
            return $ok ? ['ok' => true] : new WP_Error('db_error', 'insert failed', ['status' => 500]);
        },
    ]);

    // List records (oldest -> newest, last N).
    register_rest_route($ns, '/list', [
        'methods'             => 'GET',
        'permission_callback' => 'rasm_agent_can',
        'callback'            => function (WP_REST_Request $r) {
            global $wpdb;
            $collection = $r->get_param('collection');
            if (!rasm_agent_valid_collection($collection)) {
                return new WP_Error('bad_request', 'invalid collection', ['status' => 400]);
            }
            $limit = min(5000, max(1, intval($r->get_param('limit') ?: 1000)));
            $since = $r->get_param('since');
            $table = rasm_agent_table();
            if ($since) {
                $ts   = gmdate('Y-m-d H:i:s', strtotime($since));
                $rows = $wpdb->get_col($wpdb->prepare("SELECT data FROM (SELECT id, data FROM {$table} WHERE collection = %s AND ts >= %s ORDER BY id DESC LIMIT %d) t ORDER BY id ASC", $collection, $ts, $limit));
            } else {
                $rows = $wpdb->get_col($wpdb->prepare("SELECT data FROM (SELECT id, data FROM {$table} WHERE collection = %s ORDER BY id DESC LIMIT %d) t ORDER BY id ASC", $collection, $limit));
            }
            return array_map(function ($d) {
                return json_decode($d, true);
            }, $rows);
        },
    ]);

    // Single JSON documents (latest audit, alert de-dupe map, guideline snapshots).
    register_rest_route($ns, '/kv/(?P<key>[a-zA-Z0-9_-]{1,60})', [
        [
            'methods'             => 'GET',
            'permission_callback' => 'rasm_agent_can',
            'callback'            => function (WP_REST_Request $r) {
                global $wpdb;
                $table = rasm_agent_table();
                $row   = $wpdb->get_var($wpdb->prepare("SELECT data FROM {$table} WHERE collection = %s ORDER BY id DESC LIMIT 1", 'kv:' . $r['key']));
                return ['value' => $row === null ? null : json_decode($row, true)];
            },
        ],
        [
            'methods'             => 'PUT',
            'permission_callback' => 'rasm_agent_can',
            'callback'            => function (WP_REST_Request $r) {
                global $wpdb;
                $table = rasm_agent_table();
                $name  = 'kv:' . $r['key'];
                $wpdb->delete($table, ['collection' => $name]);
                $ok = $wpdb->insert($table, ['collection' => $name, 'ts' => gmdate('Y-m-d H:i:s'), 'data' => wp_json_encode($r->get_param('value'))]);
                return $ok ? ['ok' => true] : new WP_Error('db_error', 'write failed', ['status' => 500]);
            },
        ],
    ]);
});
