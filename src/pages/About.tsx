import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <h1>Over</h1>
      <p>
        Hier vind je statistieken mbt het weer in Dourbes. De code van deze applicatie staat op <a href="https://github.com/bartwr/meteo-dourbes" target="_blank">github.com/bartwr/meteo-dourbes</a> (de server) en <a href="https://github.com/bartwr/meteo-dourbes-ui" target="_blank">github.com/bartwr/meteo-dourbes-ui</a> (de site).
      </p>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => history.push('/')}
      >
        Terug
      </button>
    </Fragment>
  )
}
