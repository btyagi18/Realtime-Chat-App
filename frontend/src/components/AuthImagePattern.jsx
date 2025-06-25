const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-yellow-500 p-12">
      <div className="max-w-md text-center">
        {/* Chat Pattern */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-gradient-to-br from-yellow-300/30 to-yellow-500/20 
                shadow-lg flex items-${i % 2 === 0 ? "start" : "end"
                } justify-${i % 2 === 0 ? "start" : "end"} p-3`}
              style={{
                animation: 'blurFade 4s ease-in-out infinite',
                WebkitAnimation: 'blurFade 4s ease-in-out infinite',
              }}
            >
              <div
                className={`w-3/4 h-2 rounded-full ${i % 3=== 0
                  ? "bg-yellow-800 animate-pulse"
                  : "bg-yellow-800/70"
                  }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold mb-4 text-black-800">{title}</h2>
        <p className="text-black-900/70">{subtitle}</p>
      </div>

      {/* Gentle Keyframe Animation */}
      <style>
        {`
          @keyframes blurFade {
            0%, 100% {
              filter: blur(0px);
            }
            50% {
              filter: blur(0px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AuthImagePattern;
