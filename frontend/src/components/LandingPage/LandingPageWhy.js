import React from 'react';

const LandingPageWhy = () => {
    return (
        <section className="lp-middle"> 
            <div className="lp-middleBground"></div>
            <h1>WHY TRIPHIKERS IS THE BEST PLACE TO FIND TRAVEL PARTNERS?</h1>
            <section>
                <img src={whyTriphikersImg} alt="Friends Traveling" />
                <article>
                    <p>
                        Triphikers is the place to go to find like-minded travelers to share lasting memories with. You can find people in a city you are currently in or that you're 
                        planning to travel to. Browse through trips posted by other users so you can find your perfect partner. 
                    </p>

                    <p>
                        We pride ourselves on our safety while not forcing you to pay a premium price to have access to all of our features. Making the search for your travel buddy 
                        that much easier. Allowing you to find your partner as quickly and smoothly as possible is our goal.
                    </p>
                </article>
            </section>
            <LandingPageCreateAccount redirect={redirect} />
        </section>
    )
}

export default LandingPageWhy