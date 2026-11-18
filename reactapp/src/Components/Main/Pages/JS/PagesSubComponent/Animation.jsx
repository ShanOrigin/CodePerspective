import InitAnimation from '../../../../__initAnimation__'

export default function Animation({ name }) {

  return (
    <>
      <div className="animation-section ">
        <div className="animation-area">
          <InitAnimation
            key={`${location.pathname}?${location.search}`}
            aniName={name}
          />
        </div>
        {
        // in future  code editor feature place 
        /* <div className="code-area">
          <CodeSwiper code={code} />
        </div> */}
      </div>
    </>
  )
}
