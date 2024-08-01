'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useBreakpoint } from '@/lib/mobile';

interface BaseProps {
  children: React.ReactNode;
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CredenzaProps extends BaseProps {
  className?: string;
  asChild?: true;
}

function Credenza({ children, ...props }: RootCredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaComponent = isDesktop ? Dialog : Drawer;

  return <CredenzaComponent {...props}>{children}</CredenzaComponent>;
}

function CredenzaTrigger({ className, children, ...props }: CredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaTriggerComponent = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CredenzaTriggerComponent className={className} {...props}>
      {children}
    </CredenzaTriggerComponent>
  );
}

function CredenzaClose({ className, children, ...props }: CredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaCloseComponent = isDesktop ? DialogClose : DrawerClose;

  return (
    <CredenzaCloseComponent className={className} {...props}>
      {children}
    </CredenzaCloseComponent>
  );
}

function CredenzaContent({
  className,
  children,
  ...props
}: CredenzaProps & {
  canClose?: boolean;
}) {
  const { isMd: isDesktop } = useBreakpoint('md');

  if (isDesktop) {
    return (
      <DialogContent className={className} {...props}>
        {children}
      </DialogContent>
    );
  }

  return (
    <DrawerContent className={className} {...props}>
      {children}
    </DrawerContent>
  );
}

function CredenzaDescription({ className, children, ...props }: CredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaDescriptionComponent = isDesktop
    ? DialogDescription
    : DrawerDescription;

  return (
    <CredenzaDescriptionComponent className={className} {...props}>
      {children}
    </CredenzaDescriptionComponent>
  );
}

function CredenzaHeader({ className, children, ...props }: CredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaHeaderComponent = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CredenzaHeaderComponent className={className} {...props}>
      {children}
    </CredenzaHeaderComponent>
  );
}

function CredenzaTitle({ className, children, ...props }: CredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaTitleComponent = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CredenzaTitleComponent className={className} {...props}>
      {children}
    </CredenzaTitleComponent>
  );
}

function CredenzaBody({ className, children, ...props }: CredenzaProps) {
  return (
    <div className={cn('px-4 md:px-0', className)} {...props}>
      {children}
    </div>
  );
}

function CredenzaFooter({ className, children, ...props }: CredenzaProps) {
  const { isMd: isDesktop } = useBreakpoint('md');
  const CredenzaFooterComponent = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CredenzaFooterComponent className={className} {...props}>
      {children}
    </CredenzaFooterComponent>
  );
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
};
