import React from 'react'


//Erreur 403 : l'accès à la ressource demandée est interdit
function Page403() {
  return (
    <>
<br/><br/> <br/><br/><br/><br/><br/><br/>
<section className="content">
  <div className="error-page">
    <h2 className="headline text-danger">403</h2>
    <div className="error-content">
      <h3><i className="fas fa-exclamation-triangle text-danger" /> Oops!.</h3>
      <p>
      désolé, vous n'avez pas l'accès à cette page 
        
      </p>
    
    </div>
  </div>

</section>

    </>
  )
}

export default Page403
