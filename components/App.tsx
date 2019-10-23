export default ({ children }) => (
  <main>
    {children}
    <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }

      body > div,
      #__next,
      #__next > div,
      main {
        height: 100%;
      }
    `}</style>
  </main>
);
