'use client';

import type { RefObject } from 'react';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type CinematicConditions = {
  desktop?: boolean;
  mobile?: boolean;
  reduceMotion?: boolean;
};

export function useCinematicTimeline(
  rootRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || !enabled) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: '(min-width: 721px)',
          mobile: '(max-width: 720px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (matchContext) => {
          const conditions =
            matchContext.conditions as CinematicConditions | undefined;

          const select = gsap.utils.selector(root);
          const isMobile = Boolean(conditions?.mobile);

          const stage = select(
            '.syrum-cinematic-stage',
          )[0] as HTMLElement | undefined;

          const symbol = select(
            '.syrum-hero-symbol',
          )[0] as HTMLElement | undefined;

          const symbolMark = select(
            '.syrum-hero-symbol-mark',
          )[0] as HTMLElement | undefined;

          const originContent = select(
            '[data-origin-content]',
          )[0] as HTMLElement | undefined;

          const symbolCopy = select(
            '[data-symbol-copy]',
          )[0] as HTMLElement | undefined;

          const symbolTrajectory = select(
            '[data-symbol-trajectory]',
          )[0] as HTMLElement | undefined;

          const symbolTrajectoryLine = select(
            '[data-symbol-trajectory-line]',
          )[0] as HTMLElement | undefined;

          const symbolTrajectoryGlow = select(
            '[data-symbol-trajectory-glow]',
          )[0] as HTMLElement | undefined;

          const symbolTrajectoryPoint = select(
            '[data-symbol-trajectory-point]',
          )[0] as HTMLElement | undefined;

          const conversationIntro = select(
            '[data-conversation-intro]',
          )[0] as HTMLElement | undefined;

          const inboxPreview = select(
            '[data-inbox-preview]',
          )[0] as HTMLElement | undefined;

          const messages = select(
            '[data-conversation-message]',
          ) as HTMLElement[];

          const departmentSelector = select(
            '[data-department-selector]',
          )[0] as HTMLElement | undefined;

          const departmentOptions = select(
            '[data-department-option]',
          ) as HTMLElement[];

          const routingLine = select(
            '[data-routing-line] span',
          )[0] as HTMLElement | undefined;

          const routingResult = select(
            '[data-routing-result]',
          )[0] as HTMLElement | undefined;

          const agentMessage = select(
            '[data-agent-message]',
          )[0] as HTMLElement | undefined;

          const scrollIndicator = select(
            '.syrum-scroll-indicator',
          )[0] as HTMLElement | undefined;

          const ambientGlow = select(
            '.syrum-ambient-glow',
          )[0] as HTMLElement | undefined;

          const ambientGrid = select(
            '.syrum-ambient-grid',
          )[0] as HTMLElement | undefined;

          const automationIntro = select(
            '[data-automation-intro]',
          )[0] as HTMLElement | undefined;

          const automationRules = select(
            '[data-automation-rule]',
          ) as HTMLElement[];

          const kanbanPreview = select(
            '[data-kanban-preview]',
          )[0] as HTMLElement | undefined;

          const kanbanBoard = select(
            '[data-kanban-board]',
          )[0] as HTMLElement | undefined;

          const kanbanCard = select(
            '[data-kanban-card]',
          )[0] as HTMLElement | undefined;

          const cardProgress = select(
            '[data-card-progress]',
          )[0] as HTMLElement | undefined;

          const automationPulse = select(
            '[data-automation-pulse] span',
          )[0] as HTMLElement | undefined;

          const automationEvents = select(
            '[data-automation-event]',
          ) as HTMLElement[];

          const dashboardIntro = select(
            '[data-dashboard-intro]',
          )[0] as HTMLElement | undefined;

          const dashboardSummary = select(
            '[data-dashboard-summary] span',
          ) as HTMLElement[];

          const dashboardPreview = select(
            '[data-dashboard-preview]',
          )[0] as HTMLElement | undefined;

          const dashboardMetrics = select(
            '[data-dashboard-metric]',
          ) as HTMLElement[];

          const dashboardChart = select(
            '[data-dashboard-chart]',
          )[0] as HTMLElement | undefined;

          const chartLine = select(
            '[data-chart-line]',
          )[0] as unknown as SVGPathElement | undefined;

          const chartArea = select(
            '[data-chart-area]',
          )[0] as unknown as SVGPathElement | undefined;

          const dashboardChannels = select(
            '[data-dashboard-channels]',
          )[0] as HTMLElement | undefined;

          const dashboardRing = select(
            '[data-dashboard-ring]',
          )[0] as unknown as SVGCircleElement | undefined;

          const dashboardChannelItems = select(
            '[data-dashboard-channel]',
          ) as HTMLElement[];

          const dashboardActivity = select(
            '[data-dashboard-activity]',
          ) as HTMLElement[];

          const whiteLabelContent = select(
            '[data-white-label-content]',
          )[0] as HTMLElement | undefined;

          const whiteLabelFeatures = select(
            '[data-white-label-feature]',
          ) as HTMLElement[];

          const brandStudio = select(
            '[data-brand-studio]',
          )[0] as HTMLElement | undefined;

          const brandPanels = select(
            '[data-brand-panel]',
          ) as HTMLElement[];

          const brandColors = select(
            '[data-brand-color]',
          ) as HTMLElement[];

          const brandPreview = select(
            '[data-brand-preview]',
          )[0] as HTMLElement | undefined;

          const brandLogo = select(
            '[data-brand-logo]',
          )[0] as HTMLElement | undefined;

          const brandMetrics = select(
            '[data-brand-metric]',
          ) as HTMLElement[];

          const brandChart = select(
            '[data-brand-chart]',
          )[0] as unknown as SVGPathElement | undefined;

          const cinematicOutro = select(
            '[data-cinematic-outro]',
          )[0] as HTMLElement | undefined;

          const outroActions = select(
            '[data-outro-actions]',
          )[0] as HTMLElement | undefined;

          if (
            !stage ||
            !symbol ||
            !symbolMark ||
            !originContent ||
            !symbolCopy ||
            !symbolTrajectory ||
            !symbolTrajectoryLine ||
            !symbolTrajectoryGlow ||
            !symbolTrajectoryPoint ||
            !conversationIntro ||
            !inboxPreview ||
            !departmentSelector ||
            !routingResult ||
            !agentMessage ||
            !automationIntro ||
            !kanbanPreview ||
            !kanbanBoard ||
            !kanbanCard ||
            !cardProgress ||
            !dashboardIntro ||
            !dashboardPreview ||
            !dashboardChart ||
            !chartLine ||
            !chartArea ||
            !dashboardChannels ||
            !dashboardRing ||
            !whiteLabelContent ||
            !brandStudio ||
            !brandPreview ||
            !brandLogo ||
            !brandChart ||
            !cinematicOutro ||
            !outroActions
          ) {
            return;
          }

          if (conditions?.reduceMotion) {
            gsap.set(
              [
                originContent,
                symbolCopy,
                symbolTrajectory,
                symbolTrajectoryLine,
                symbolTrajectoryGlow,
                symbolTrajectoryPoint,
                conversationIntro,
                inboxPreview,
                departmentSelector,
                routingResult,
                agentMessage,
                automationIntro,
                kanbanPreview,
                kanbanCard,
                ...messages,
                ...departmentOptions,
                ...automationRules,
                ...automationEvents,
                dashboardIntro,
                dashboardPreview,
                dashboardChart,
                dashboardChannels,
                ...dashboardSummary,
                ...dashboardMetrics,
                ...dashboardChannelItems,
                ...dashboardActivity,
                whiteLabelContent,
                brandStudio,
                brandPreview,
                brandLogo,
                cinematicOutro,
                outroActions,
                ...whiteLabelFeatures,
                ...brandPanels,
                ...brandColors,
                ...brandMetrics,
              ],
              {
                clearProps: 'all',
                autoAlpha: 1,
              },
            );

            return;
          }

          gsap.set(symbolCopy, {
            autoAlpha: 0,
            y: isMobile ? 18 : 26,
          });

          gsap.set(symbolTrajectory, {
            autoAlpha: 0,
          });

          gsap.set(
            [
              symbolTrajectoryLine,
              symbolTrajectoryGlow,
            ],
            {
              autoAlpha: 0,
              scaleY: 0,
              transformOrigin: 'top center',
            },
          );

          gsap.set(symbolTrajectoryPoint, {
            autoAlpha: 0,
            y: 0,
            scale: 0.6,
          });

          gsap.set([conversationIntro, inboxPreview], {
            autoAlpha: 0,
          });

          gsap.set(conversationIntro, {
            x: isMobile ? 0 : -45,
            y: isMobile ? -20 : 0,
          });

          gsap.set(inboxPreview, {
            x: isMobile ? 0 : 70,
            y: isMobile ? 55 : 0,
            scale: 0.94,
            rotateY: isMobile ? 0 : -5,
          });

          gsap.set(messages, {
            autoAlpha: 0,
            y: 16,
          });

          gsap.set(departmentSelector, {
            autoAlpha: 0,
            y: 14,
          });

          gsap.set(departmentOptions, {
            autoAlpha: 0,
            y: 10,
            scale: 0.96,
          });

          gsap.set(routingResult, {
            autoAlpha: 0,
            y: 16,
            scale: 0.96,
          });

          gsap.set(agentMessage, {
            autoAlpha: 0,
            x: 25,
            y: 12,
          });

          if (routingLine) {
            gsap.set(routingLine, {
              yPercent: -100,
            });
          }

          gsap.set([automationIntro, kanbanPreview], {
            autoAlpha: 0,
          });

          gsap.set(automationIntro, {
            x: isMobile ? 0 : -45,
            y: isMobile ? -18 : 0,
          });

          gsap.set(automationRules, {
            autoAlpha: 0,
            y: 10,
          });

          gsap.set(kanbanPreview, {
            x: isMobile ? 0 : 75,
            y: isMobile ? 50 : 0,
            scale: 0.94,
            rotateY: isMobile ? 0 : -4,
          });

          gsap.set(kanbanCard, {
            x: 0,
            y: 0,
            scale: 0.96,
            autoAlpha: 0,
          });

          gsap.set(cardProgress, {
            width: '0%',
          });

          gsap.set(automationEvents, {
            autoAlpha: 0,
            y: 10,
          });

          if (automationPulse) {
            gsap.set(automationPulse, {
              xPercent: -100,
            });
          }

          gsap.set([dashboardIntro, dashboardPreview], {
            autoAlpha: 0,
          });

          gsap.set(dashboardIntro, {
            x: isMobile ? 0 : -45,
            y: isMobile ? -18 : 0,
          });

          gsap.set(dashboardSummary, {
            autoAlpha: 0,
            y: 10,
          });

          gsap.set(dashboardPreview, {
            x: isMobile ? 0 : 75,
            y: isMobile ? 45 : 0,
            scale: 0.94,
            rotateY: isMobile ? 0 : -4,
          });

          gsap.set(dashboardMetrics, {
            autoAlpha: 0,
            y: 12,
            scale: 0.96,
          });

          gsap.set(dashboardChart, {
            autoAlpha: 0,
            y: 14,
          });

          gsap.set(chartLine, {
            strokeDashoffset: 900,
          });

          gsap.set(chartArea, {
            opacity: 0,
          });

          gsap.set(dashboardChannels, {
            autoAlpha: 0,
            x: 15,
          });

          gsap.set(dashboardRing, {
            strokeDashoffset: 289,
          });

          gsap.set(dashboardChannelItems, {
            autoAlpha: 0,
            x: 10,
          });

          gsap.set(dashboardActivity, {
            autoAlpha: 0,
            y: 10,
          });

          gsap.set([whiteLabelContent, brandStudio], {
            autoAlpha: 0,
          });

          gsap.set(whiteLabelContent, {
            x: isMobile ? 0 : -45,
            y: isMobile ? -18 : 0,
          });

          gsap.set(whiteLabelFeatures, {
            autoAlpha: 0,
            y: 10,
          });

          gsap.set(brandStudio, {
            x: isMobile ? 0 : 75,
            y: isMobile ? 45 : 0,
            scale: 0.94,
            rotateY: isMobile ? 0 : -4,
          });

          gsap.set(brandPanels, {
            autoAlpha: 0,
            x: -12,
          });

          gsap.set(brandColors, {
            scale: 0.78,
            autoAlpha: 0,
          });

          gsap.set(brandPreview, {
            autoAlpha: 0,
            scale: 0.96,
          });

          gsap.set(brandLogo, {
            scale: 0.9,
            autoAlpha: 0,
          });

          gsap.set(brandMetrics, {
            autoAlpha: 0,
            y: 10,
          });

          gsap.set(brandChart, {
            strokeDashoffset: 700,
          });

          gsap.set(cinematicOutro, {
            autoAlpha: 0,
            y: isMobile ? 20 : 30,
          });

          gsap.set(outroActions, {
            autoAlpha: 0,
            y: 12,
          });

          const timeline = gsap.timeline({
            defaults: {
              ease: 'power2.inOut',
            },
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: isMobile ? '+=710%' : '+=875%',
              scrub: 0.8,
              pin: stage,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              originContent,
              {
                autoAlpha: 0,
                y: isMobile ? -18 : -30,
                duration: 0.18,
              },
              0.03,
            )
            .to(
              scrollIndicator ?? [],
              {
                autoAlpha: 0,
                duration: 0.1,
              },
              0.02,
            )
            .to(
              symbol,
              {


                top: isMobile ? '32%' : '33%',
                left: '50%',
                right: 'auto',
                x: 0,
                y: 0,
                xPercent: -50,
                yPercent: -50,
                width: isMobile
                  ? 'clamp(112px, 29vw, 155px)'
                  : 'clamp(145px, 12vw, 190px)',
                duration: 0.42,

              },
              0.1,
            )
            .to(
              symbolMark,
              {
                scale: 0.96,
                rotate: 0,
                opacity: 1,
                duration: 0.42,
              },
              0.1,
            )
            .to(
              ambientGlow ?? [],
              {
                opacity: 1,
                scale: 1.08,
                duration: 0.38,
              },
              0.15,
            )
            .to(
              ambientGrid ?? [],
              {
                opacity: 0.08,
                duration: 0.3,
              },
              0.2,
            )
            .to(
              symbolCopy,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.22,
              },
              0.38,
            )
            .to(
              symbolTrajectory,
              {
                autoAlpha: 1,
                duration: 0.12,
              },
              0.46,
            )
            .to(
              [
                symbolTrajectoryLine,
                symbolTrajectoryGlow,
              ],
              {
                autoAlpha: 1,
                scaleY: 1,
                duration: 0.28,
                ease: 'power2.out',
              },
              0.48,
            )
            .to(
              symbolTrajectoryPoint,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.1,
              },
              0.5,
            )
            .to(
              symbolTrajectoryPoint,
              {
                y: isMobile ? 150 : 205,
                duration: 0.28,
                ease: 'power1.inOut',
              },
              0.52,
            )
            .to(
              [
                symbolCopy,
                symbolTrajectory,
              ],
              {
                autoAlpha: 0,
                y: -14,
                duration: 0.14,
              },
              0.76,
            )
            .to(
              symbol,
              {
                top: isMobile ? '15%' : '19%',
                left: isMobile ? '50%' : '10%',
                right: 'auto',
                bottom: 'auto',
                x: 0,
                y: 0,
                xPercent: isMobile ? -50 : 0,
                yPercent: -50,
                width: isMobile
                  ? 'clamp(84px, 22vw, 118px)'
                  : 'clamp(105px, 8.5vw, 145px)',
                duration: 0.34,
              },
              0.76,
            )
            .to(
              symbolMark,
              {
                scale: 0.88,
                opacity: isMobile ? 0.2 : 0.5,
                duration: 0.3,
              },
              0.76,
            )
            .to(
              conversationIntro,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.22,
              },
              0.91,
            )
            .to(
              inboxPreview,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.27,
              },
              0.93,
            )
            .to(
              messages,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
                stagger: 0.07,
              },
              1.08,
            )
            .to(
              departmentSelector,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.17,
              },
              1.2,
            )
            .to(
              departmentOptions,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.17,
                stagger: 0.045,
              },
              1.22,
            )
            .to(
              routingLine ?? [],
              {
                yPercent: 100,
                duration: 0.22,
                ease: 'power1.inOut',
              },
              1.4,
            )
            .to(
              routingResult,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.2,
              },
              1.48,
            )
            .to(
              agentMessage,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.2,
              },
              1.63,
            )
            .to(
              inboxPreview,
              {
                boxShadow:
                  '0 42px 105px rgb(0 0 0 / 52%), 0 0 95px rgb(92 66 220 / 18%)',
                duration: 0.28,
              },
              1.72,
            )
            .to(
              [conversationIntro, inboxPreview],
              {
                autoAlpha: 0,
                y: isMobile ? -24 : -18,
                duration: 0.18,
              },
              1.94,
            )
            .to(
              symbol,
              {
                top: isMobile ? '15%' : '19%',
                left: isMobile ? '50%' : '10%',
                right: 'auto',
                bottom: 'auto',
                x: 0,
                y: 0,
                xPercent: isMobile ? -50 : 0,
                yPercent: -50,
                width: isMobile
                  ? 'clamp(84px, 22vw, 118px)'
                  : 'clamp(105px, 8.5vw, 145px)',
                duration: 0.34,
              },
              1.94,
            )
            .to(
              symbolMark,
              {
                opacity: isMobile ? 0.2 : 0.5,
                scale: 0.8,
                duration: 0.26,
              },
              1.94,
            )
            .to(
              automationIntro,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.22,
              },
              2.1,
            )
            .to(
              kanbanPreview,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.28,
              },
              2.12,
            )
            .to(
              automationRules,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.16,
                stagger: 0.05,
              },
              2.28,
            )
            .to(
              kanbanCard,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.2,
              },
              2.36,
            )
            .to(
              automationPulse ?? [],
              {
                xPercent: 110,
                duration: 0.2,
                ease: 'power1.inOut',
              },
              2.52,
            )
            .to(
              kanbanCard,
              {
                x: () => kanbanBoard.clientWidth * 0.335,
                duration: 0.34,
                ease: 'power2.inOut',
              },
              2.52,
            )
            .to(
              cardProgress,
              {
                width: '52%',
                duration: 0.34,
              },
              2.52,
            )
            .to(
              automationEvents[0] ?? [],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
              },
              2.7,
            )
            .to(
              kanbanCard,
              {
                x: () => kanbanBoard.clientWidth * 0.67,
                duration: 0.4,
                ease: 'power2.inOut',
              },
              2.92,
            )
            .to(
              cardProgress,
              {
                width: '100%',
                duration: 0.4,
              },
              2.92,
            )
            .to(
              automationEvents.slice(1),
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
                stagger: 0.12,
              },
              3.08,
            )
            .to(
              kanbanCard,
              {
                borderColor: 'rgb(72 204 151 / 42%)',
                boxShadow:
                  '0 20px 52px rgb(0 0 0 / 46%), 0 0 36px rgb(72 204 151 / 16%)',
                duration: 0.24,
              },
              3.3,
            )
            .to(
              [automationIntro, kanbanPreview],
              {
                autoAlpha: 0,
                y: isMobile ? -22 : -16,
                duration: 0.18,
              },
              3.56,
            )
            .to(
              symbol,
              {
                top: isMobile ? '18%' : '21%',
                left: isMobile ? '50%' : '8%',
                right: 'auto',
                bottom: 'auto',
                x: 0,
                y: 0,
                xPercent: isMobile ? -50 : 0,
                yPercent: -50,
                width: isMobile
                  ? 'clamp(65px, 18vw, 90px)'
                  : 'clamp(86px, 7.35vw, 118px)',
                duration: 0.25,
              },
              3.56,
            )
            .to(
              symbolMark,
              {
                opacity: isMobile ? 0.2 : 0.5,
                scale: 0.74,
                duration: 0.25,
              },
              3.56,
            )
            .to(
              dashboardIntro,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.22,
              },
              3.72,
            )
            .to(
              dashboardPreview,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.28,
              },
              3.74,
            )
            .to(
              dashboardSummary,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.16,
                stagger: 0.045,
              },
              3.9,
            )
            .to(
              dashboardMetrics,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.2,
                stagger: 0.07,
              },
              3.94,
            )
            .to(
              dashboardChart,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.2,
              },
              4.12,
            )
            .to(
              chartLine,
              {
                strokeDashoffset: 0,
                duration: 0.55,
                ease: 'power1.inOut',
              },
              4.18,
            )
            .to(
              chartArea,
              {
                opacity: 1,
                duration: 0.38,
              },
              4.35,
            )
            .to(
              dashboardChannels,
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.22,
              },
              4.22,
            )
            .to(
              dashboardRing,
              {
                strokeDashoffset: 92,
                duration: 0.48,
                ease: 'power1.inOut',
              },
              4.3,
            )
            .to(
              dashboardChannelItems,
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.16,
                stagger: 0.055,
              },
              4.45,
            )
            .to(
              dashboardActivity,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.17,
                stagger: 0.07,
              },
              4.58,
            )
            .to(
              dashboardPreview,
              {
                boxShadow:
                  '0 45px 115px rgb(0 0 0 / 54%), 0 0 110px rgb(55 148 217 / 15%)',
                duration: 0.3,
              },
              4.78,
            )
            .to(
              [dashboardIntro, dashboardPreview],
              {
                autoAlpha: 0,
                y: isMobile ? -22 : -16,
                duration: 0.18,
              },
              5.05,
            )
            .to(
              symbol,
              {
                top: isMobile ? '18%' : '24%',
                left: isMobile ? '50%' : '30%',
                right: 'auto',
                bottom: 'auto',
                x: 0,
                y: 0,
                xPercent: isMobile ? -50 : 0,
                yPercent: -50,
                width: isMobile
                  ? 'clamp(68px, 18.7vw, 95px)'
                  : 'clamp(95px, 8.15vw, 130px)',
                duration: 0.25,
              },
              5.05,
            )
            .to(
              symbolMark,
              {
                opacity: isMobile ? 0.2 : 0.5,
                scale: 0.72,
                duration: 0.25,
              },
              5.05,
            )
            .to(
              whiteLabelContent,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.22,
              },
              5.22,
            )
            .to(
              brandStudio,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.28,
              },
              5.24,
            )
            .to(
              whiteLabelFeatures,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.16,
                stagger: 0.055,
              },
              5.38,
            )
            .to(
              brandPanels,
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.17,
                stagger: 0.055,
              },
              5.42,
            )
            .to(
              brandColors,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.15,
                stagger: 0.045,
              },
              5.56,
            )
            .to(
              brandPreview,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.23,
              },
              5.52,
            )
            .to(
              brandLogo,
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.2,
              },
              5.68,
            )
            .to(
              brandMetrics,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.16,
                stagger: 0.06,
              },
              5.76,
            )
            .to(
              brandChart,
              {
                strokeDashoffset: 0,
                duration: 0.52,
                ease: 'power1.inOut',
              },
              5.84,
            )
            .to(
              brandStudio,
              {
                boxShadow:
                  '0 45px 118px rgb(0 0 0 / 55%), 0 0 115px rgb(69 137 244 / 17%)',
                duration: 0.28,
              },
              6.15,
            )
            .to(
              [whiteLabelContent, brandStudio],
              {
                autoAlpha: 0,
                y: isMobile ? -24 : -18,
                duration: 0.2,
              },
              6.42,
            )
            .to(
              symbol,
              {
                top: isMobile ? '30%' : '27%',
                left: '50%',
                xPercent: -50,
                yPercent: -50,
                width: isMobile
                  ? 'clamp(105px, 30vw, 155px)'
                  : 'clamp(150px, 14vw, 220px)',
                duration: 0.35,
              },
              6.42,
            )
            .to(
              symbolMark,
              {
                opacity: 0.42,
                scale: 0.98,
                duration: 0.35,
              },
              6.42,
            )
            .to(
              cinematicOutro,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.28,
              },
              6.67,
            )
            .to(
              outroActions,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.2,
              },
              6.86,
            )
            .to(
              symbolMark,
              {
                opacity: 0.52,
                scale: 1.03,
                duration: 0.32,
              },
              6.95,
            );
        },
      );

      return () => {
        media.revert();
      };
    }, root);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, [enabled, rootRef]);
}
