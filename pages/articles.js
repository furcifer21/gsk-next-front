import Link from "next/link";
import MainLayout from "../components/MainLayout";

export default function AllArticlesPage() {
    const articlesInfo = [
        {
            img: '/images/articles/armarura-main.jpg',
            name: 'Арматура 25г2с и А500: различие',
            slug: 'razlichia-armaturi',
        },
        {
            img: '/images/articles/beton-main.jpg',
            name: 'Марки бетона',
            slug: 'marki-betona',
        },
        {
            img: '/images/articles/pesik-main.jpg',
            name: 'Значение строительного песка',
            slug: 'znachenia-peska',
        },
        {
            img: '/images/articles/beton2-main.jpg',
            name: 'Как проверить прочность бетона?',
            slug: 'prochnost-betona',
        }
    ]

    return (
        <MainLayout seo={{title: `GSK Статьи`, description: ''}}>
            <section className="articles">
                <div className="container">
                    <div className="row name-row">
                        <div className="name-row-item">
                            <h1>Статьи</h1>
                        </div>
                    </div>
                    <hr/>
                    <div className="row justify-content-around row-cols-1 row-cols-sm-2 row-cols-md-2 ">
                        {articlesInfo.map((article, index) => {
                            return (
                                <div key={`article-${index}`} className="article d-flex flex-column justify-content-between">
                                    <div className="article-title position-relative">
                                        <Link href={`/articles/${article.slug}`}><a className="fake-link-block"></a></Link>
                                        {article.name}
                                    </div>
                                    <div>
                                        <Link href={`/articles/${article.slug}`}>
                                            <a>
                                                <img src={article.img} className="img-article" alt={article.name}/>
                                            </a>
                                        </Link>
                                        <div className="article-footer">
                                            <button className="btn org position-relative">
                                                <Link href={`/articles/${article.slug}`}><a className="fake-link-block"></a></Link>
                                                Читать полностью
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export const getServerSideProps = async () => {
    return {
        props: {}
    }
};