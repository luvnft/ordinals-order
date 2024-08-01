import { type PropsWithChildren } from 'react';
import { MotionDiv } from '@/lib/motion';

export function AuthMotionContainer({ children }: PropsWithChildren) {
  return (
    <MotionDiv
      initial={{
        y: 10,
        opacity: 0,
        filter: 'blur(5px)',
      }}
      animate={{
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          type: 'spring',
          duration: 0.6,
        },
      }}
      className="mx-2 flex-1 md:w-[425px] md:flex-initial"
    >
      {children}
    </MotionDiv>
  );
}
