import React from 'react';
import ProfList from '../components/ProfList';
import ProfTotal from '../components/ProfTotal';
import LinkButton from '../components/LinkButton';
import { Link } from 'react-router-dom';

export const ProfessionsPage = ( {profParams} ) =>  {
    const profItems = profParams[0];
    const profession = profParams[1];
    const realm = profParams[2];
    const faction = profParams[3];

    return(
        <>
            <article>
                <h2>
                    Professions Page
                </h2>
                
                <p>
                    Here, you can find all of the items you'll need and how much it'll cost you to go from level 1 to level 450!
                    This will only tell you the cost of the items you'll need. For a detailed guide on how to level your profession,
                    go to <Link to={{ pathname: "https://www.wow-professions.com/wotlk-classic" }} target="_blank">wow-professions.com/wotlk (new tab)</Link>.
                </p>
                <p>
                    Since a lot of professions have multiple choices on how to level, I have chosen the cheapest path at the time of
                    creating these lists. Items with multiple names means the different choices you can take.
                </p>
                <p>
                    Keep in mind, since skill ups have a random chance at yellow or green, you may need to buy more or less of
                    some items. This is unavoidable. Please plan on spending +/- 20% of the total cost. Cost of vendor materials (such as vials)
                    not included in the price. Recipes not included in the total.
                </p>
                <p>
                    Do not refresh this page. This will clear the profession list, and you will need to search for the items again.
                </p>
                <div><LinkButton to='../choose-profession'>Choose Profession</LinkButton></div>
                <ProfList
                    profItems={profItems}
                    profession={profession}
                    realm={realm}
                    faction={faction}
                />
                <ProfTotal
                    profItems={profItems}
                />
            </article>
        </>
    );
};

export default ProfessionsPage;