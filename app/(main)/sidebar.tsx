'use client';

import { useState } from 'react';
import {
  BitcoinIcon,
  ChevronLeft,
  CoinsIcon,
  LogOutIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type Route as NextRoute } from 'next';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { cn, errorToast, getIsPathActive } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MotionAnimatePresence, MotionAside } from '@/lib/motion';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { routes } from '@/lib/routing';
import { useBreakpoint } from '@/lib/mobile';
import { Logo } from '../../components/ui/logo';
import { ThemeToggle } from './theme-toggle';

const navigation = [
  {
    groupId: 'dashboard',
    groupLabel: 'Dashboard',
    groupItems: [
      {
        id: 'bitcoin',
        label: 'Bitcoin',
        href: routes.bitcoin,
        icon: BitcoinIcon,
      },
      {
        id: 'brc20',
        label: 'BRC20',
        href: routes.brc20,
        icon: CoinsIcon,
      },
      {
        id: 'order',
        label: 'Order',
        href: routes.order,
        icon: ShoppingCartIcon,
      },
    ],
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  const [isExpanded, setIsExpanded] = useState(true);

  const { isMd: isDesktop } = useBreakpoint('md');

  const _isExpanded = isExpanded && isDesktop;

  const [isSigningOut, setIsSigningOut] = useState(false);

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } catch (error) {
      setIsSigningOut(false);
      errorToast(error);
    }
  };

  return (
    <MotionAnimatePresence>
      <MotionAside
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: _isExpanded ? 250 : 75,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          duration: 0.6,
        }}
        className={cn('relative h-screen')}
      >
        <div className="invisible absolute -right-[12px] bottom-[64px] z-20 lg:visible">
          <Button
            className="h-6 w-6 rounded-md"
            variant="outline"
            size="icon"
            onClick={() => {
              setIsExpanded(!_isExpanded);
            }}
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform duration-700 ease-in-out',
                !_isExpanded ? 'rotate-180' : 'rotate-0',
              )}
            />
          </Button>
        </div>

        <div className="relative flex h-full flex-col border-r">
          <div className="h-18 flex items-center justify-center gap-4 border-b p-4">
            <Logo />

            {_isExpanded ? (
              <div className="flex flex-col">
                <motion.h1
                  key="logo-ordinals-demo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring' }}
                  className="line-clamp-1 text-xl font-bold"
                >
                  Ordinals
                </motion.h1>

                <motion.span className="line-clamp-1 text-xs text-muted-foreground">
                  Demonstration purposes only
                </motion.span>
              </div>
            ) : null}
          </div>

          <nav className="flex h-full flex-col gap-4 p-3 pb-4">
            {navigation.map(({ groupId, groupLabel, groupItems }) => (
              <div key={groupId}>
                {_isExpanded ? (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 28 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="truncate px-4 pb-2 text-sm font-medium text-muted-foreground"
                  >
                    {groupLabel}
                  </motion.p>
                ) : null}

                {groupItems.map(({ id, href, label, icon: Icon }) => {
                  const isActive = getIsPathActive(pathname, href);

                  return (
                    <TooltipProvider key={id} disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isActive ? 'secondary' : 'ghost'}
                            className="mb-1 h-10 w-full justify-start"
                            asChild
                          >
                            <Link
                              className={cn(
                                'flex',
                                !_isExpanded && 'justify-center',
                              )}
                              href={href as NextRoute}
                            >
                              <div className="min-w-[18px]">
                                <Icon
                                  size={18}
                                  className={_isExpanded ? 'mr-4' : ''}
                                />
                              </div>

                              {_isExpanded ? (
                                <motion.span
                                  key={label}
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: 1,
                                  }}
                                  transition={{
                                    type: 'spring',
                                    delay: 0.2,
                                  }}
                                >
                                  {label}
                                </motion.span>
                              ) : null}
                            </Link>
                          </Button>
                        </TooltipTrigger>

                        {!_isExpanded && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ))}

            <div className="mt-auto flex items-center gap-2">
              <Button
                loading={isSigningOut}
                variant="outline"
                className={cn('flex-1', !_isExpanded && 'max-w-[50px]')}
                leftIcon={<LogOutIcon className="size-4" />}
                onClick={() => void handleSignOut()}
              >
                {_isExpanded ? <span>Sign out</span> : null}
              </Button>

              {_isExpanded ? <ThemeToggle /> : null}
            </div>
          </nav>
        </div>
      </MotionAside>
    </MotionAnimatePresence>
  );
}
