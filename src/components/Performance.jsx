import { useRef } from 'react'
import { performanceImages, performanceImgPositions } from '../constants'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Performance = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            ".content p",
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.content p',
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );

        if (isMobile) return;
        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        performanceImgPositions.forEach((pos) => {
            if(pos.id == "p5") return;

            const toVars = { y: 0, autoAlpha: 1};
            if (pos.left !== undefined) toVars.left = `${pos.left}%`;
            if (pos.right !== undefined) toVars.right = `${pos.right}%`;
            if (pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
            if (pos.transform !== undefined) toVars.transform = pos.transform;

            tl.to(`.${pos.id}`, toVars, 0);
        });
    }, { scope: sectionRef, dependencies: [isMobile] });
  return (
    <section id="performance">
        <h2>Next-level graphics performance. Game on.</h2>

        <div className='wrapper'>
            {performanceImages.map((image) => (
                <img key={image.id} src={image.src} alt={image.id} />
            ))}
        </div>

        <div className='content'>
            <p>
                Run grraphics-intensive workflows with a responsiveness that keeps up 
                with your imagination. The M4 family of chips features a GPU with a 
                second-generation hardware-accelarted ray tracing engine that renders 
                images faster, so {' '}
                <span className='text-white'>gaming feels more immersive than ever. </span>{' '}
                And Dynamic Caching optimses fast on-cip memory to dramatically increase 
                average GPU utilisation -- driving a huge performance boost for the 
                most demanding pro apps and games.
            </p>
        </div>
    </section>
  )
}

export default Performance