'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routing';
import { Button } from '@/components/ui/button';
import { BorderBeam } from './landing-border-beam';
import landingHeroImage from './landing-hero.webp';

export function LandingHero() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  return (
    <section
      id="landing-hero"
      className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8"
    >
      <h1 className="translate-y-[-1rem] animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl">
        Inscription as a Service
      </h1>

      <h2 className="mb-12 translate-y-[-1rem] animate-fade-in text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">
        Ordinals is an app for demonstration purposes only.
      </h2>

      <div className="flex animate-fade-in items-center justify-center opacity-0 ease-in-out [--animation-delay:600ms]">
        <Link href={routes.auth.signIn}>
          <Button className="translate-y-[-1rem] animate-fade-in gap-1 rounded-lg text-white opacity-0 ease-in-out [--animation-delay:600ms] dark:text-black">
            <span>Get Started</span>
            <ArrowRightIcon className="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div
        ref={ref}
        className="relative mt-[8rem] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]"
      >
        <div
          className={cn(
            'rounded-xl border border-white/10 bg-white bg-opacity-[0.01] transition-[backdrop-filter] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)]',
            inView && 'before:animate-image-glow',
          )}
        >
          <BorderBeam
            size={200}
            duration={12}
            delay={11}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
          />

          <Image
            priority
            quality={100}
            placeholder="blur"
            src={landingHeroImage}
            alt="Ordinals"
            className="relative h-full w-full rounded-[inherit] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
