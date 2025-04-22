import React, {useState}  from 'react'
import { useParams } from 'react-router-dom'
import { Trash3Fill, PencilSquare, CloudDownload } from 'react-bootstrap-icons';
import ModalSingleTextDelete from '../components/modals/ModalSingleTextDelete';
import { generatePath, useNavigate } from "react-router-dom";
import ModalSingleTextDownload from '../components/modals/ModalSingleTextDownload';

const SinglePage = ({value}) => {
    const { note_id } = useParams();
    const [modalShowDelete, setModalShowDelete] = useState(false);
    const [modalShowDownload, setModalShowDownload] = useState(false);

    const navigate = useNavigate()

    const handleProceed = (note_id) => {
        note_id && navigate(generatePath("/note/update/:note_id/", { note_id }));
    };
    return (
        <>
            <main className='container'>
                <div className='grid-note-containers'>
                    <div className='note-title'>
                        <p className='note-title-1'>Note title</p>
                        <p className='note-created-time'>Created at: 10pm</p>
                        <p className='note-updated-time'>Updated at: 11pm</p>
                    </div>
                    <ModalSingleTextDelete
                        show={modalShowDelete}
                        onHide={() => setModalShowDelete(false)}
                        value={value}
                    />
                    <ModalSingleTextDownload
                        show={modalShowDownload}
                        onHide={() => setModalShowDownload(false)}
                        value={value}
                    />
                    <div className="note-menu">
                        <CloudDownload className='download-text' onClick={() => setModalShowDownload(true)}/>
                        <PencilSquare className='edit-text' onClick={() => handleProceed('dfsfesfsfe')} />
                        <Trash3Fill className='delete-text' onClick={() => setModalShowDelete(true)}/>
                    </div>
                    <div className='note-body'>
                        <article className='note-article'>
                            <span className='note-text'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.sdsdwadawdad wadad
                                Accusamus quasi iste esse, officia nulla officiis optio,
                                suscipit ut provident temporibus, perspiciatis ab mollitia voluptatibus maiores velit culpa repudiandae laborum fuga.
                                Magni fugit aut asperiores dignissimos tempora. Consequuntur sequi corporis ad consequatur fugit mollitia?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere eum obcaecati rem, illo, quae recusandae sunt dolorem iure, nam consequuntur repudiandae reprehenderit distinctio itaque similique aut soluta error assumenda quos atque vel. Neque recusandae corrupti velit consequuntur, earum dolore tenetur eum excepturi, dicta dolorem asperiores hic fugit omnis accusantium magnam quos laudantium aliquid! Pariatur asperiores illum totam? At magnam, esse eligendi, porro possimus quis, quas accusamus veniam autem recusandae architecto blanditiis! Dolore laboriosam nisi eius nobis aut qui omnis veritatis ipsam sit repellendus aliquid quae ratione facilis culpa impedit molestiae necessitatibus, optio corrupti atque aperiam nihil. Error minus deleniti maiores quos quo repudiandae, qui, iste tempore officiis debitis porro ad aliquid quod praesentium facere dignissimos? Sit laborum corrupti iste alias quia aperiam recusandae eligendi rerum? Esse distinctio fugiat, nulla beatae delectus doloribus corporis architecto, quidem, ratione aspernatur accusamus minus praesentium saepe maiores illum non optio nemo hic voluptates culpa a quas deserunt. Minima facere soluta ad iure officia. Praesentium beatae, nemo quis ut debitis culpa veritatis recusandae voluptas aliquam nisi optio amet animi, adipisci similique atque eum et placeat? Possimus repellendus maiores ipsum, hic natus quae voluptates cumque repudiandae asperiores. Rem voluptate, ratione deserunt tempore asperiores pariatur, tenetur consectetur est laboriosam qui officiis molestiae reiciendis in eaque similique praesentium error amet? Inventore, deleniti! Eos officia eius sint in deleniti id vel, consectetur omnis iure unde voluptas doloribus itaque saepe aliquam, pariatur, obcaecati nesciunt esse recusandae dicta? Magni, qui culpa cum voluptates labore amet dolorum nemo architecto autem illum, quaerat quasi. Omnis veniam esse quam nobis, voluptates cum hic repellat maiores enim vitae magnam. Quidem ab reiciendis voluptatibus, molestiae explicabo consequatur quos iusto minus doloribus soluta ad dolor assumenda amet neque obcaecati omnis corrupti inventore unde illum ratione odio. Odit quaerat sapiente quam culpa ipsa cupiditate exercitationem distinctio officiis dolore consequatur earum cum, aperiam ea numquam esse nesciunt rerum necessitatibus, voluptas tempora consequuntur illum deserunt vero doloremque. Assumenda molestias odit atque, iusto in similique? Beatae hic exercitationem natus. Nemo, cupiditate eum? Tempora voluptas et totam, recusandae, eius asperiores rem consectetur iusto nam a excepturi vel error, accusamus eveniet eaque rerum inventore cupiditate ea. Odit eius ullam dolorum obcaecati placeat dolore tempore et neque minima consequatur voluptas nesciunt deserunt optio consectetur vitae eveniet id repudiandae est commodi delectus, modi nostrum adipisci qui ratione. Iusto, sint, rerum aliquam nisi voluptatibus delectus velit enim nostrum sit expedita recusandae sequi quos ratione architecto nihil. Animi cupiditate iusto quam quas deleniti laboriosam illo quod nesciunt? Sit dolorem ipsam quia, ducimus doloribus nostrum minus adipisci tenetur sapiente fugit asperiores magnam officiis distinctio voluptatibus illo pariatur voluptatum incidunt eos nesciunt voluptates hic fugiat? At eaque temporibus, architecto exercitationem voluptates, quibusdam minus id repellendus dolore quaerat dolor voluptatem! Aut maiores assumenda dicta natus. Nam alias nulla fuga itaque impedit quis ratione inventore. Quis fugit animi doloribus expedita veritatis perspiciatis repellendus. Mollitia ad commodi aliquid fugiat accusamus doloremque incidunt nobis inventore similique animi. Hic modi similique voluptatibus minus? Nobis nihil dolorum provident quibusdam libero optio est ad illo rem modi!
                                Iusto velit eos sequi quis saepe unde?
                            </span>
                        </article>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SinglePage
