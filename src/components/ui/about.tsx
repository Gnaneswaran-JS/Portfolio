import { BGPattern } from "@/components/ui/bg-pattern";
import { section } from "framer-motion/client";

export default function About() {
	return (
		<section id="about">
      <div className="mx-auto max-w space-y-5 p-8">
			<div className="relative flex aspect-video flex-col items-center justify-center ">
				<BGPattern variant="grid" mask="fade-edges" />
				<section  className="relative w-full py-16 md:py-24 lg:py-32  overflow-hidden">
      
      {/* BGPattern is placed here. `absolute` makes it fill the parent, and `-z-10` places it behind the content. */}
      
      {/* Increased horizontal padding on medium (md) and large (lg) screens */}
      <div className="container mx-auto px-4 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-8 items-center">
          
          {/* The heading already uses font-bold as requested */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-left text-neutral-900 dark:text-neutral-50">
            About Me
          </h2>

          <div className="md:col-start-2 md:row-start-1 md:row-span-2 flex justify-center items-center">
            <img
              src="/me.jpeg"
              alt="A portrait of the author"
              className="aspect-square w-full max-w-sm rounded-2xl object-cover shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Added font-mono to the paragraph as requested */}
          <p className="md:col-start-1 md:row-start-2 text-neutral-600  dark:text-neutral-400 leading-relaxed font-mono text-justify text-lg">
            Hello! I'm a passionate and creative developer with a love for building beautiful,
            functional, and user-centric web applications. With a strong foundation in modern
            technologies like React, Next.js, and Astro, I enjoy turning complex problems into
            elegant, simple solutions. My goal is to always write clean, efficient code that
            stands the test of time. When I'm not coding, you can find me exploring new tech,
            contributing to open-source, or enjoying a good cup of coffee.
          </p>

        </div>
      </div>
    </section>
			</div>
		</div>
    </section>
	);
}
