import { useState } from 'react';

interface CaseStudy {
  id: string;
  name: string;
  tagline?: string;
  content: React.ReactNode;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'khadijah',
    name: 'Khadijah',
    content: (
      <>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Khadijah</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Khadijah had not worked in over 10 years, had been living in a shelter, and was dealing with symptoms of depression, deepened by the loss of her father. Working closely with the trainers at America Works, Khadijah was exposed to many industries.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Finally settling on security guard training, she completed the course and was immediately hired by a partner of America Works. Khadijah came into the office with happy tears in her eyes once she realized that she would finally be back working after a long absence away from the workforce.
        </p>
        <blockquote className="border-l-3 border-aw-red pl-4 italic text-gray-700 mt-6">
          "It was all thanks to you guys, you gave me hope…and for that I'm extremely grateful!"
        </blockquote>
      </>
    )
  },
  {
    id: 'valerie',
    name: 'Valerie',
    content: (
      <>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Valerie</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Valerie was receiving disability from Social Security and wanted desperately to improve her situation. When Valerie started with America Works, she was nearly homeless and had very little relationship with her daughter.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          It took some adjusting, but after starting her second job she was on her path to stability and independence. She has now been working for over six years. During that time, America Works helped her find a stable apartment and Valerie has been able to rebuild her relationship with her daughter.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Valerie credits America Works with turning her life around and continues to share her accomplishments.
        </p>
      </>
    )
  },
  {
    id: 'johnnie',
    name: 'Johnnie',
    tagline: "Never Too Late: A Veteran's Story",
    content: (
      <>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-2">Never Too Late: A Veteran's Story</div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Johnnie</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          After many years of being homeless, unemployed and battling addiction, Johnnie proved that it's never too late to start over and was honored by President Barack Obama at the White House.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Johnnie served his country in the Army overseas. Ten years after his return, substance abuse took over his life. He lost his job, and lived on the streets without work for more than 19-years until he connected with Chicago's Veterans Affairs.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          The VA referred him to America Works, where the staff gave him a much needed support system. They helped him prepare a resume, coached him on using a computer, email and the Internet. The team recognized his potential and knew he was ready to step into the workforce again.
        </p>
        <p className="text-gray-600 leading-relaxed">
          They encouraged him to test for a position at the United States Postal Service. He passed the exam and accepted a position with the USPS. Johnnie now lives in his own apartment and is proudly employed.
        </p>
      </>
    )
  },
  {
    id: 'akeem',
    name: 'Akeem',
    content: (
      <>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Akeem</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Akeem was laid off from a Digital Marketing Coordinator position and began searching for something that would fulfill him and be relevant to his qualifications. However, after some difficult circumstances with family issues at home, he realized he needed additional help.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Akeem was referred to America Works where his representative used all their available resources to assist him.
        </p>
        <blockquote className="border-l-3 border-aw-red pl-4 italic text-gray-700 my-6">
          "The training here was on a different level. The people here…genuinely want to help."
        </blockquote>
        <p className="text-gray-600 leading-relaxed">
          Akeem was referred to an interview by America Works and he accepted the position as a Web Designer for $50,000 per year plus benefits.
        </p>
      </>
    )
  },
  {
    id: 'lamont',
    name: 'Lamont',
    tagline: 'No Barriers, Only Opportunity',
    content: (
      <>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-2">No Barriers, Only Opportunity</div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Lamont</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Lamont was unable to read and write when he came to America Works. He also didn't have any prior work experience. However, the team did not see any of these circumstances as barriers. Instead, they focused on his potential and strengths – his work ethic, willingness to learn and dedication to improving himself.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          With the help of the staff filling out applications, Lamont applied for local jobs. On occasion, he would get lost on his way to job interviews because he was unable to read street signs. Our team would immediately find him and drop him off at the right location.
        </p>
        <p className="text-gray-600 leading-relaxed">
          They coached him on attire and interview skills so that he felt confident and prepared. And it worked. Lamont works for a national restaurant chain.
        </p>
      </>
    )
  },
  {
    id: 'owen',
    name: 'Owen',
    tagline: 'A Fresh Start',
    content: (
      <>
        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-blue mb-2">A Fresh Start</div>
        <h3 className="font-display text-2xl text-gray-900 mb-4">Owen</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Owen was newly out of prison after serving more than 24-years when he first came to America Works. He had never used a computer, the Internet or a mobile phone. However, he had his life back and was eager to catch up on everything he had missed.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Our team coached him through the basics of operating a computer, setting up email, applying for jobs, inquiring about certifications and various courses. While he lacked work experience and a resume, Owen came in each day with drive and determination to become self-sufficient.
        </p>
        <p className="text-gray-600 leading-relaxed">
          His hard work paid off. He landed a job after his first interview. Not long after, he obtained his permit and now has his driver's license. Owen is well on his way to being self-sufficient and has never looked back.
        </p>
      </>
    )
  }
];

export default function CaseStudiesTabs() {
  const [activeTab, setActiveTab] = useState('khadijah');

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle diagonal accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>

      <div className="container max-w-container mx-auto px-8 relative z-10">
        <header className="mb-16">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-aw-red mb-4">Success Stories</div>
          <h2 className="font-display text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-gray-900">Real people. Real transformations.</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Video */}
          <div className="relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-900">
              <video
                controls
                className="w-full h-full object-cover"
                poster="/images/jobseekers-poster.jpg"
              >
                <source src="/images/jobseekers.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-aw-red/20 rounded-lg -z-10"></div>
          </div>

          {/* Tabbed Content */}
          <div className="case-studies-tabs">
            {/* Tab Navigation */}
            <div className="case-tabs-nav">
              {caseStudies.map((study) => (
                <button
                  key={study.id}
                  className={`case-tab font-body text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${activeTab === study.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(study.id)}
                >
                  {study.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="case-content-wrapper h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              {caseStudies.map((study) => (
                <div
                  key={study.id}
                  className={`case-content ${activeTab === study.id ? 'active' : ''}`}
                  style={{ display: activeTab === study.id ? 'block' : 'none' }}
                >
                  {study.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
