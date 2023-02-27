import React from 'react';
import ProfList from '../components/ProfList';
import ProfTotal from '../components/ProfTotal';
import LinkButton from '../components/LinkButton';

export const ProfessionsPage = ( {profItems, profession, realm, faction} ) =>  {
    return(
        <>
            <article>
                <h2>
                    Professions Page
                </h2>
                
                <p>
                    Here, you can find all of the items you'll need and how much it'll cost you to go from level 1 to level 450!
                    Keep in mind, since skill ups have a random chance at yellow or green, you may need to buy more or less of
                    some items. This is unavoidable. Please plan on spending +/- 20% of the total cost. Do not refresh this page.
                    This will clear the profession list, and you will need to search for the items again.
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