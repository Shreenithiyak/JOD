const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-10 mt-auto text-center flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h3 className="text-2xl font-extrabold text-primary-600 mb-2">SkillSwap Festival</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          Connecting the world's brightest minds through shared learning experiences. Join the future of skills.
        </p>
        <div className="border-t border-gray-100 pt-6 w-full flex flex-col items-center justify-center gap-2">
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            © {new Date().getFullYear()} SkillSwap Festival. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
