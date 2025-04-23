export default function LinkedinImage() {
    return (
      <div className="w-full flex justify-center mb-40 lg:mb-60">
        <div className="relative w-full bg-gray-900 shadow-lg flex flex-col items-center px-2 pb-16 lg:pb-8"> 
          <h2 className="mt-16  text-xl md:text-3xl font-semibold text-gray-100 text-center">
            Make Your Profile Stand Out with a Professional Photo
          </h2>
          <p className="mt-4 text-md text-gray-300 text-center px-6 max-w-3xl">
            A great LinkedIn photo creates a powerful first impression. Ensure proper 
            <span className="relative before:content-['“'] after:content-['”']"> lighting</span>, 
            a <span className="relative before:content-['“'] after:content-['”']"> clean background</span>, 
            high <span className="relative before:content-['“'] after:content-['”']"> image quality</span>, 
            and a confident <span className="relative before:content-['“'] after:content-['”']"> smile</span> 
            to showcase professionalism and approachability.
          </p>
          <div className="relative w-full flex justify-center mt-6 -mb-50 lg:-mb-60"> 
            <div className="w-full md:w-[85%] lg:w-[70%] flex justify-center">
              <img 
                src="/linkedinimage.png" 
                alt="LinkedIn Profile Image" 
                className="w-full h-auto object-cover rounded-lg shadow-lg border-4 border-white"
              />
            </div>
          </div>

        </div>
      </div>
    );
}