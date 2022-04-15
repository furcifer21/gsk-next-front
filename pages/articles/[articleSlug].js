import MainLayout from "../../components/MainLayout";
import React, {useState} from "react";
import axios from "axios";
import {API_URL} from "../../components/constant";
import Link from "next/link";
import {useRouter} from "next/router";
import {articles} from "../../components/partials/articlesHTMLText";
import $ from "jquery";

export default function ArticlePage() {
    const router = useRouter();
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const [agreeCheckbox, setAgreeCheckbox] = useState(true);

    function sendForm(e) {
        e.preventDefault();
        const formData = {
            name: nameInput.trim(),
            email: emailInput.trim(),
            question: textInput.trim(),
        }

        if(agreeCheckbox && (emailInput.trim() !== '')) {
            axios.post(`${API_URL}/sendQuestion`, formData)
                .then(res => {
                    $('#success-modal').addClass('open-modal');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    return (
        <MainLayout seo={{title: `GSK `, description: ''}}>
            <section className="one-article">
                <div className="container breadcrumb">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/articles">Статьи</Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="container">
                    <div className="row name-row">
                        <div className="name-row-item">
                            <h1>{articles[router.asPath].name}</h1>
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>
            <section className="catalog-body">
                <div className="container">
                    <div className="text-center mt-4">
                        <img className="logo-article" src="/images/logo2.svg" alt="logo" height="80"/>
                    </div>
                    <div className="row justify-content-between">
                        {/*<div className="col-sidbar-left">
                            <div className="sidbar-left-name">
                                <img src="/images/icon/File_dock.svg" alt=""/>
                                Статьи
                            </div>
                            <div className="sidbar-left-item  br">Бетонные заводы</div>
                            <div className="sidbar-left-item br">Марки бетона</div>
                            <div className="sidbar-left-item active br">Классы бетона</div>
                            <div className="sidbar-left-item br">Гарантия на бетон</div>
                            <div className="sidbar-left-item br">Добавки в бетон</div>
                            <div className="sidbar-left-item br ">Для снабженцев</div>
                        </div>*/}
                        <div>
                            <div className="row articles">
                                <div dangerouslySetInnerHTML={{__html: articles[router.asPath].textHtml}}></div>
                                <div className="col question">
                                    <div className="form-title">Остались вопросы?</div>
                                    <div className="dscr ">Если вы не нашли ответ на свой вопрос на нашем сайте, то
                                        можете написать его нашим специалистам.
                                    </div>
                                    <form className="form articles" id="form-1" onSubmit={(e) => sendForm(e)}>
                                        <div className="row-form">
                                            <input className="text-field w-input"
                                                   type="text"
                                                   name="name"
                                                   value={nameInput}
                                                   placeholder="Ваше имя"
                                                   onChange={(e) => setNameInput(e.target.value)}
                                            />
                                            <input className="text-field w-input"
                                                   type="email"
                                                   name="mail"
                                                   value={emailInput}
                                                   placeholder="Ваш e-mail"
                                                   required="required"
                                                   onChange={(e) => setEmailInput(e.target.value)}
                                            />
                                        </div>
                                        <div className="row-form">
                                            <textarea placeholder="Задайте вопрос нашим специалистам"
                                                      value={textInput}
                                                      onChange={(e) => setTextInput(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="row-form">
                                            <input type="checkbox"
                                                   id="cb1"
                                                   required="required"
                                                   checked={agreeCheckbox}
                                                   onChange={() => setAgreeCheckbox(!agreeCheckbox)}
                                            />
                                            <label htmlFor="cb1">
                                                Я согласен на <a href="#">обработку персональных данных</a>
                                            </label>
                                            <button type="submit" className="btn org main-btn form-btn" >
                                                Отправить письмо
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
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