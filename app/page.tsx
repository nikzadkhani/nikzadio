

import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-semibold tracking-tighter">
          Nikzad Khani
        </h1>
        <div className="mb-4 md:mb-0">
          <Image
            src="/me.jpg"
            alt="Nikzad Khani"
            width={160}
            height={160}
            className="rounded-full grayscale hover:grayscale-0 transition-all duration-500 ease-in-out object-cover"
            priority
          />
        </div>
      </div>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {`Senior Software Engineer at Verily in Boston, MA. I specialize in building scalable AI-driven applications and robust data pipelines using Go, Python, and cloud-native technologies.`}
      </p>


    </section>
  )
}
