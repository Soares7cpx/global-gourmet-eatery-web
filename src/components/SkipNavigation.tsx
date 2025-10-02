const SkipNavigation = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:shadow-lg"
    >
      Pular para o conteúdo principal
    </a>
  );
};

export default SkipNavigation;
