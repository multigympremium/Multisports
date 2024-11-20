import { useEffect, useState } from "react";
import MetaTags from "./components/Home/MetaTags/MetaTags";
import useGetSeo from "./Hook/GetPublicDataHook/useGetSeo";

function App() {

  const content = useGetSeo({});

  useEffect(() => {
    console.log(content, "content");

    document.head.appendChild(
      `<link rel="icon" type="image/svg+xml" href={`${import.meta.env.VITE_APP_SPACES_URL}multi-sports/` + content.metaOgImage}/>`
    );
  }, [content]);

  return (
    <>
    <MetaTags metaTitle={content.metaTitle} metaDescription={content.metaDescription} metaOgTitle={content.metaOgTitle} metaOgDescription={content.metaOgDescription} metaOgImage={content.metaOgImage} metaKeywords={content.metaKeywords} />
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;
