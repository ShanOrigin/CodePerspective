import React, { useRef, useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai' // Ace Dark Theme
import 'ace-builds/src-noconflict/theme-github' // Ace Light Theme
import 'ace-builds/src-noconflict/mode-javascript' // JavaScript Mode
import 'ace-builds/src-noconflict/mode-python' // Python Mode
import 'ace-builds/src-noconflict/mode-c_cpp' // C/C++ Mode
import 'ace-builds/src-noconflict/mode-java' // Java Mode
import 'ace-builds/src-noconflict/mode-csharp' // C# Mode

import prettier from 'prettier'
import parserBabel from 'prettier/parser-babel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import '../../CSS/CodeEditor.css'
import { useTheme } from '../../../../../Contexts/ThemeContext'

/**
 * Individual Code Editor component wrapping AceEditor with responsive configuration
 * and dynamic light/dark theme adaptation matching application theme mode.
 */
function Editor({ editorId, mode, code }) {
  const [editorCode, setEditorCode] = useState(code)
  const { isThemeModeDark } = useTheme()

  return (
    <div className="editor">
      <AceEditor
        mode={mode}
        theme={isThemeModeDark ? 'monokai' : 'github'}
        value={editorCode}
        name={editorId}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={false}
        showGutter={false}
        highlightActiveLine={false}
        onChange={value => setEditorCode(value)}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          vScrollBarAlwaysVisible: true,
          displayIndentGuides: false,
          showLineNumbers: false,
          readOnly: true,
          cursorStyle: 'crosshair',
          highlightGutterLine: false,
          useWorker: false,
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          tabSize: 2,
          enableMobileMenu: false,
        }}
        style={{
          width: '100%',
          height: '300px',
          cursor: 'crosshair',
        }}
      />
    </div>
  )
}
export default function CodeSwiper({ code }) {

  const [activeLanguage, setActiveLanguage] = useState('C') // Default active language
  const swiperRef = useRef(null) // Reference to the Swiper instance

  const languages = Object.keys(code)

  const formatCode = code => {
    try {
      const formattedCode = prettier.format(code, {
        parser: 'babel', // For JavaScript and similar languages
        plugins: [parserBabel],
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 80, // Adjust this to your desired line width
        tabWidth: 2, // Indentation width
        useTabs: false, // Use spaces instead of tabs
        semi: true, // Always use semicolons
        proseWrap: 'never', // Avoid breaking text in the code
      })
      return formattedCode
    } catch (err) {
      console.error('Error formatting code:', err)
      return code
    }
  }
  const handleSlideChange = swiper => {
    const currentLang = languages[swiper.activeIndex]
    setActiveLanguage(currentLang)

    // Automatically format the code when the language changes
    const formattedCode = formatCode(code[currentLang].code)
    code[currentLang].code = formattedCode // Update the code in the "code" object
  }

  return (
    <div className="code-swiper">
      {/* Language Section */}
      <div className="language-section">
        {languages.map((lang, index) => (
          <span
            key={lang}
            id={lang.toLowerCase()}
            className={`language ${activeLanguage === lang ? 'active' : ''}`}
            onClick={() => {
              setActiveLanguage(lang) // Update active language
              if (swiperRef.current) {
                swiperRef.current.slideTo(index) // Navigate to the selected slide
              }
            }}
          >
            {lang}
          </span>
        ))}
      </div>

      {/* Swiper Section */}
      <div className="code-editor">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={swiper => (swiperRef.current = swiper)} // Save Swiper instance to the ref
          onSlideChange={swiper => {
            // Update active language based on current slide index
            //const currentLang = languages[swiper.activeIndex];
            //  setActiveLanguage(currentLang);
            handleSlideChange(swiper)
          }}
        >
          {Object.entries(code).map(([lang, value]) => (
            <SwiperSlide key={lang}>
              <Editor
                editorId={`${lang}-editor`}
                mode={value.language}
                code={value.code}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
