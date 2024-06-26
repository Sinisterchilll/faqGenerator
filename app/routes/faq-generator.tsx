// app/routes/faq-generator.tsx
import { ChangeEvent, useState } from 'react';
import axios from 'axios'; // Import Axios for HTTP requests

export default function FaqGenerator() {
  const [content, setContent] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [language, setLanguage] = useState('en');
  const [persona, setPersona] = useState('professional');
  const [faqs, setFaqs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setNumQuestions: React.Dispatch<React.SetStateAction<number>>, minValue: number, maxValue: number) => {
    let value = parseInt(e.target.value);
    
    if (isNaN(value)) {
      value = minValue; // Reset to min value if input is not a number
    } else {
      value = Math.min(Math.max(value, minValue), maxValue); // Clamp value within range
    }
    setNumQuestions(value);
  };


  const generateFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/openai', {
        content,
        numQuestions,
        language,
        persona,
      });
      setFaqs(response.data.faqs);
    } catch (error) {
      console.error('Error generating FAQs:', error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-blue-50 sm:py-16 lg:py-20 xl:py-24">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center lg:max-w-4xl">
          <h1 className="text-base font-bold tracking-widest text-blue-600 uppercase">
            TOOLS
          </h1>
          <p className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-display">
            AI FAQ Generator
          </p>
          <p className="max-w-3xl mx-auto mt-5 text-base font-normal text-gray-700 sm:text-lg lg:text-xl">
            Need FAQs? We've got you covered! Tell us your topic, and we'll generate custom questions and answers for any use case. </p>
        </div>
        <div className="max-w-6xl mx-auto mt-16 lg:mt-20 flex flex-col md:flex-row border rounded-3xl border-gray-300 overflow-hidden">

          {/* <!-- FAQ CONFIGURATIONS --> */}
          <div className=" sm:w-2/3 p-8 bg-gray-50 flex flex-col gap-8">
            <div className="flex flex-col gap-6">

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Enter the Topic
                </label>
                <div className="mt-2">
                  <input 
                      type="text" 
                      placeholder="Eg. Crypto, Online Payments, Leather shoes" 
                      className=" p-2 block w-full py-2 text-gray-900 transition-all duration-150 border-0 shadow-sm rounded-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 caret-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div>
                <div className="flex gap-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900 ">
                    Content
                  </label>

                  <div className="relative z-10 flex items-center group">
                    <button type="button" className="inline-flex items-center justify-center text-gray-500 transition-all duration-150 hover:text-blue-600 p-1.5 -m-1.5 hover:bg-gray-100 rounded-lg focus:bg-gray-100 focus:text-blue-600">
                      <span className="sr-only">
                        Info
                      </span>
                      <svg aria-hidden="true" className="w-4 h-4 text-gray-500 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M108,84a16,16,0,1,1,16,16A16,16,0,0,1,108,84Zm128,44A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Zm-72,36.68V132a20,20,0,0,0-20-20,12,12,0,0,0-4,23.32V168a20,20,0,0,0,20,20,12,12,0,0,0,4-23.32Z">
                        </path>
                      </svg>
                    </button>
                    <span className="absolute w-48 px-3 py-2 text-xs font-semibold text-white whitespace-normal transition-all duration-200 scale-0 -translate-x-1/2 bg-gray-900 rounded-md -top-14 group-hover:scale-100 left-1/2">
                      Provide the relevant content for the topic you want to generate FAQs about.
                    </span>
                  </div>
                </div>

                <div className="mt-2">
                  <textarea
                    placeholder="Provide the relevant content for the topic you want to generate FAQs about."
                    rows={4}
                    className="block w-full py-2 text-gray-900 border-0 shadow-sm resize-y rounded-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 caret-blue-600 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-2"
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
              </div>
              <div className="flex justify-between gap-6 w-full items-center">
                <div className="w-full">
                  <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900">Number of FAQs you want to generate</label>
                  <input
                    className="w-full range-slider h-2 bg-gray-200 rounded-lg accent-blue-600 appearance-none cursor-pointer"
                    type="range"
                    id="numQuestions"
                    min={1}
                    max={20}
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    style={{
                      background: `linear-gradient(to right, #145DEE 0%, #145DEE ${numQuestions*5}%, #CBD5E0 ${numQuestions*5}%, #CBD5E0 100%)`
                    }} />

                  <div className="w-full flex justify-between mt-2">
                    <span className="text-sm text-gray-400 font-medium">1</span>
                    <span className="text-sm text-gray-400 font-medium">5</span>
                    <span className="text-sm text-gray-400 font-medium">10</span>
                    <span className="text-sm text-gray-400 font-medium">20</span>

                  </div>
                </div>
                <input 
                    type="number" 
                    className="no-spinner w-16 h-9 rounded-lg border border-blue-600 p-5" 
                    value={numQuestions}
                    onChange={(e) => handleInputChange(e, setNumQuestions, 1, 20)}/>
              </div>
              <div>
                <label htmlFor="tone" className="block mb-2 text-sm font-medium text-gray-900">
                  Select Tone
                </label>
                <select
                  className="p-2 block w-full py-2 text-gray-900 border-0 shadow-sm bg-white rounded-xl ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  id="persona"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}>

                  <option value="Friendly" selected>
                    Friendly
                  </option>
                  <option value="Formal">
                    Formal
                  </option>
                  <option value="Informal">
                    Informal
                  </option>
                  <option value="Funny">
                    Funny
                  </option>
                  <option value="Excited">
                    Excited
                  </option>
                  <option value="Professional">
                    Professional
                  </option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1 justify-center px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 shadow-sm rounded-xl hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={generateFAQs}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate FAQs'}
              Generate FAQs
            </button>
          </div>

          {/* <!-- CONTENT DISPLAY --> */}

          <div className="bg-white w-full flex flex-col max-h-[572px]">
            <div className="flex justify-between w-full p-4">
              <div className="flex items-center gap-2">
                <img className="w-auto h-3 md:h-4" src="../images/logo.svg" alt="" />
                <span className="text-gray-950 font-medium text-sm">FAQ Generator</span>
              </div>
              <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8593 3.03838C12.3967 3.00058 11.8025 3 10.95 3H5.625C5.21079 3 4.875 2.66421 4.875 2.25C4.875 1.83579 5.21079 1.5 5.625 1.5L10.9821 1.5C11.7949 1.49999 12.4506 1.49999 12.9815 1.54336C13.5281 1.58803 14.0082 1.68239 14.4525 1.90873C15.1581 2.26825 15.7318 2.84193 16.0913 3.54754C16.3176 3.99175 16.412 4.4719 16.4566 5.01853C16.5 5.54944 16.5 6.20505 16.5 7.01788V12.375C16.5 12.7892 16.1642 13.125 15.75 13.125C15.3358 13.125 15 12.7892 15 12.375V7.05C15 6.19755 14.9994 5.60331 14.9616 5.14068C14.9245 4.6868 14.8554 4.42604 14.7548 4.22852C14.5391 3.80516 14.1948 3.46095 13.7715 3.24524C13.574 3.1446 13.3132 3.07547 12.8593 3.03838ZM4.62109 4.125H10.7539C11.1493 4.12499 11.4903 4.12497 11.7713 4.14793C12.0678 4.17215 12.3627 4.22564 12.6465 4.37024C13.0698 4.58595 13.4141 4.93016 13.6298 5.35352C13.7744 5.63731 13.8278 5.93222 13.8521 6.22873C13.875 6.50966 13.875 6.85074 13.875 7.24611V13.3789C13.875 13.7743 13.875 14.1153 13.8521 14.3963C13.8278 14.6928 13.7744 14.9877 13.6298 15.2715C13.4141 15.6948 13.0698 16.0391 12.6465 16.2548C12.3627 16.3994 12.0678 16.4528 11.7713 16.4771C11.4903 16.5 11.1493 16.5 10.7539 16.5H4.62108C4.22572 16.5 3.88466 16.5 3.60373 16.4771C3.30722 16.4528 3.01231 16.3994 2.72852 16.2548C2.30516 16.0391 1.96095 15.6948 1.74524 15.2715C1.60064 14.9877 1.54715 14.6928 1.52293 14.3963C1.49998 14.1153 1.49999 13.7743 1.5 13.3789V7.24609C1.49999 6.85073 1.49998 6.50966 1.52293 6.22873C1.54715 5.93222 1.60064 5.63731 1.74524 5.35352C1.96095 4.93016 2.30516 4.58595 2.72852 4.37024C3.01231 4.22564 3.30722 4.17215 3.60373 4.14793C3.88466 4.12497 4.22573 4.12499 4.62109 4.125ZM3.72588 5.64295C3.52213 5.65959 3.44659 5.68785 3.40951 5.70675C3.26839 5.77865 3.15365 5.89339 3.08175 6.03451C3.06285 6.07159 3.03459 6.14713 3.01795 6.35088C3.00058 6.56338 3 6.84259 3 7.275V13.35C3 13.7824 3.00058 14.0616 3.01795 14.2741C3.03459 14.4779 3.06285 14.5534 3.08175 14.5905C3.15365 14.7316 3.26839 14.8463 3.40951 14.9183C3.44659 14.9371 3.52213 14.9654 3.72588 14.9821C3.93838 14.9994 4.21759 15 4.65 15H10.725C11.1574 15 11.4366 14.9994 11.6491 14.9821C11.8529 14.9654 11.9284 14.9371 11.9655 14.9183C12.1066 14.8463 12.2214 14.7316 12.2933 14.5905C12.3122 14.5534 12.3404 14.4779 12.3571 14.2741C12.3744 14.0616 12.375 13.7824 12.375 13.35V7.275C12.375 6.84259 12.3744 6.56338 12.3571 6.35088C12.3404 6.14713 12.3122 6.07159 12.2933 6.03451C12.2214 5.89339 12.1066 5.77865 11.9655 5.70675C11.9284 5.68785 11.8529 5.65959 11.6491 5.64295C11.4366 5.62558 11.1574 5.625 10.725 5.625H4.65C4.21759 5.625 3.93838 5.62558 3.72588 5.64295Z" fill="#667085" />
                </svg>
              </div>
            </div>
            <div className="flex-1 p-4 pt-0 overflow-y-auto">
              <div className="bg-gray-100 h-full rounded-xl p-3 pt-1 overflow-y-auto">

                <p className="text-sm font-normal leading-6">
                  <span className="pl-5">
                    {faqs.map((faq, index) => (
                      <p className=" mb-2 font-medium" key={index}>{faq}</p>
                    ))}
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
