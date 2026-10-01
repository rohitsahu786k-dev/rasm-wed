'use client';

import React from 'react';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useInquiry } from '@/components/InquiryProvider';

type AnimatedProps = Omit<React.ComponentProps<typeof AnimatedButton>, 'onClick'>;

/** Opens the inquiry modal. Client island so surrounding pages stay server-rendered. */
export const InquiryAnimatedButton: React.FC<AnimatedProps & { context?: string }> = ({ context, ...props }) => {
  const { open } = useInquiry();
  return <AnimatedButton {...props} onClick={() => open(context)} />;
};

export const InquiryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { context?: string }> = ({
  context,
  type = 'button',
  ...props
}) => {
  const { open } = useInquiry();
  return <button type={type} {...props} onClick={() => open(context)} />;
};
