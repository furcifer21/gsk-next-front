import MainLayout from "../components/MainLayout";
import axios from "axios";
import Link from "next/link";
import {API_URL, REAL_FAKE_DATA} from "../components/constant";
import CategoryMenu from "../components/partials/CategoryMenu";
import $ from "jquery";
import InputMask from "react-input-mask";
import React, {useState} from "react";

export default function CalculatePage({catalogCategories}) {
    const [address, setAddress] = useState('');
    const [mark, setMark] = useState('');
    const [volume, setVolume] = useState('');
    const [phone, setPhone] = useState('');

    function sendForm(e) {
        e.preventDefault();

        const formData = {
            address: address.trim(),
            mark: mark.trim(),
            volume: volume.trim(),
            phone: phone.trim(),
            manager: localStorage.getItem('manager') ?? 'mgr3'
        };$('#success-modal').addClass('open-modal');

        axios.post(`${API_URL}/email-sender/sendCalculationRequest`, formData)
            .then(res => {
                $('#success-modal').addClass('open-modal');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <MainLayout seo={{title: 'GSK Калькулятор доставки', description: ''}}>
            {catalogCategories.length > 0 &&
            <>
                <section>
                    <div className="container breadcrumb">
                        <div className="row">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#">Каталог</a></li>
                                    <li className="breadcrumb-item"><a href="#">Рассчитать стоимость доставки</a></li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row name-row">
                            <div className="name-row-item">
                                <h1>Рассчет стоимости с доставкой</h1>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </section>
                <section className="calk-body">
                    <div className="container">
                        <div className="row justify-content-between">
                            <CategoryMenu categories={catalogCategories} pageSlug={'/calculate'}/>
                            <div className="col-content">
                                <div className="form-wrapper w-form calk">
                                    <div className="deliver-block">
                                        <p align="center">
                                            <strong>Доставка бетона</strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p>
                                            <img
                                                width="624"
                                                height="415"
                                                src="/images/delivery-1.jpg"
                                                alt="Изображение выглядит как внешний, небо, грузовик, бетономешалкаи созданное описание"
                                            />
                                        </p>
                                        <p>
                                            Компания «ГСК» организует доставку бетона в Москве и Московской области от
                                            1 куба. Для транспортировки бетонного раствора мы используем миксеры с
                                            разной вместимостью, что позволяет гарантировать поставку стройматериалов в
                                            точно оговоренный срок. Именно по этой причине от клиента требуется
                                            своевременно освободить подъезд к объекту и подготовить площадку для
                                            выгрузки. В случае простоя по вине заказчика, с него взымается неустойка в
                                            соответствии с условиями компенсации, предусмотренными в договоре.
                                        </p>
                                        <p>
                                            При необходимости предоставляется техника, укомплектованная оборудованием
                                            для подачи бетонной смеси на расстояние. Итоговая стоимость доставки 1 куба
                                            бетона формируется, исходя из дальности транспортировки, сложности
                                            подъезда, срочности выполнения заказа.
                                        </p>
                                        <p>
                                            <strong>Мы доставим бетон на объект быстро и недорого</strong>
                                        </p>
                                        <p>
                                            Преимущества заказа бетона и растворов с доставкой в компании «ГСК»
                                            заключаются в:
                                        </p>
                                        <ul>
                                            <li>
                                                наличии собственного автопарка;
                                            </li>
                                        </ul>
                                        <p>
                                            · налаженности сети заводов по всей Москве и Московской области;
                                        </p>
                                        <ul>
                                            <li>
                                                демократичной ценовой политике;
                                            </li>
                                            <li>
                                                оперативности выполнения заказа.
                                            </li>
                                        </ul>
                                        <p>
                                            Оплатить услуги нашей фирмы можно любым удобным для клиента способом
                                            (безналичным платежом или рассчитаться наличными после доставки продукции
                                            на объект).
                                        </p>
                                        <table className="delivery-table" style={{color:' #303030', height: '180px', border: '1px solid #c0c0c0'}} border="1" width="624"
                                               cellSpacing="0" cellPadding="0">
                                            <tbody>
                                            <tr style={{backgroundColor: '#f5f5f5'}}>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;
                                                    <strong>Доставка</strong></span></td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}><strong>Цена с НДС 18% руб/м3</strong></span>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr style={{backgroundColor: '#f5f5f5'}}>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 10KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>370</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 15KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>410</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 20KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>450</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 25KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>495</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 30KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>540</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 35KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>590</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span style={{fontSize: '12pt'}}>&nbsp;до 40KM</span>
                                                </td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>640</span></p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap="nowrap"><span
                                                    style={{fontSize: '12pt'}}>&nbsp;Более 40KM</span></td>
                                                <td nowrap="nowrap">
                                                    <p align="center"><span style={{fontSize: '12pt'}}>685</span></p>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong>Доставка песка, щебня</strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong>
                                                <img
                                                    border="0"
                                                    width="624"
                                                    height="483"
                                                    src="/images/delivery-3.jpg"
                                                    alt="Изображение выглядит как трава, внешний, грузовик, оранжевый ски созданное описание"
                                                />
                                            </strong>
                                            <strong></strong>
                                        </p>
                                        <p>
                                            Выгодно и быстро заказать песок любого востребованного типа вы можете у
                                            нас. Мы осуществляем оперативную доставку песка по Москве и Московской
                                            Область. Условия доставки максимально удобны именно для Вас, наш приоритет
                                            – осуществление доставки в соответствии с Вашими запросами.
                                        </p>
                                        <p>
                                            <strong>Сроки доставки песка</strong>
                                        </p>
                                        <p>
                                            Доставка песка осуществляется нашей компанией круглосуточно и ежедневно.
                                            Это существенно экономит Ваше время и отвечает Вашим интересам. Мы доставим
                                            запрашиваемые материалы в любое время точно в срок.
                                        </p>
                                        <p>
                                            Преимуществом нашей компании является доставка в любую точку Москвы и
                                            Московской области. Вы просто указываете место – и материалы прибывают туда
                                            в назначенное время. Это позволяет Вам экономить время и материальные
                                            ресурсы на привлечении дополнительной техники.
                                        </p>
                                        <p>
                                            <strong>Способ доставки</strong>
                                        </p>
                                        <p>
                                            Минимальный размер заказа на доставку песка – 1 м3. Для любых Ваших целей
                                            Вы можете заказать именно такое количество материала, которое требуется, не
                                            переплачивая за ненужный объем. Мы осуществляем доставку песка навалом, а
                                            не в мешках, что обеспечивает большее удобство при получении. Вам больше не
                                            нужно тратить время на открытие упаковок, Вы можете использовать материал
                                            сразу же. Автопарк нашей фирмы позволяет нам осуществлять доставку песка
                                            3-кубовыми, 10-кубовыми, 20-кубовыми машинами и полуприцепами от 30-35
                                            кубов. Благодаря этому Вы можете быть уверены, что не возникнет никаких
                                            проблем с перевозом любого объема заказанного Вами материала.
                                        </p>
                                        <p align="center">
                                            <strong></strong>
                                        </p>
                                        <p align="center">
                                            <strong>Доставка арматуры</strong>
                                        </p>
                                        <p align="center">
                                            <strong>
                                                <img
                                                    border="0"
                                                    width="624"
                                                    height="352"
                                                    src="/images/delivery-4.jpg"
                                                    alt="Изображение выглядит как пол, оранжевый"
                                                />
                                            </strong>
                                            <strong></strong>
                                        </p>
                                        <p>
                                            <strong></strong>
                                        </p>
                                        <p>
                                            Достаточно выбрать вид транспорта – автомобильный или железнодорожный – и
                                            согласовать время отгрузки. Все сопутствующие работы вроде выбора
                                            подходящей по грузоподъемности машины и ее погрузки осуществляются
                                            поставщиком, однако мы все же уделим внимание основным правилам упаковки.
                                        </p>
                                        <p>
                                            При транспортировке следует учитывать гибкость арматуры, поэтому укладка
                                            производится так, чтобы прутья не деформировались. Если планируется, что
                                            разгрузка будет осуществляться вручную, вес одной упаковки не должен
                                            превышать 80 кг. При разгрузке с привлечением спецтехники эта цифра может
                                            быть увеличена до 35 т.
                                        </p>
                                        <p>
                                            Определенные условия относятся и к методу упаковки:
                                        </p>
                                        <p>
                                            · Стержневая арматура упаковывается в связки массой до 15 т.
                                        </p>
                                        <p>
                                            · Холоднотянутую проволоку и канаты скручивают в мотки или бухты.
                                        </p>
                                        <p>
                                            Для предотвращения рассыпания стержни увязываются через каждые 2-3 м длины,
                                            а мотки закрепляются радиальными обвязками с двух сторон.
                                        </p>
                                        <p>
                                            Для более простого определения класса изделий их дополнительно маркируют
                                            краской: у стержней на концах, у связок и мотков – на боковой поверхности.
                                        </p>
                                        <p>
                                            Каждая упаковка снабжается биркой, в которой указывается:
                                        </p>
                                        <ul>
                                            <li>
                                                номер партии,
                                            </li>
                                            <li>
                                                вес
                                            </li>
                                            <li>
                                                дата производства,
                                            </li>
                                            <li>
                                                наименование завода-изготовителя.
                                            </li>
                                        </ul>
                                        <p>
                                            Поставка также обязательно сопровождается сертификатом качества продукции,
                                            включающим информацию о номере профиля, классе, результатах испытаний на
                                            изгиб и равномерном удлинении.
                                        </p>
                                    </div>
                                    <h3>Расчитать стоимость заявки</h3>
                                    <form className="form" id="form-3" onSubmit={(e) => sendForm(e)}>
                                        <div className="row-form">
                                            <span className="label-calk">Адрес доставки:</span>
                                            <input className="text-field w-input br"
                                                   name="adres"
                                                   maxLength="256"
                                                   placeholder="Ермолино"
                                                   type="text"
                                                   value={address}
                                                   onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="row-form">
                                            <span className="label-calk">Наименование товара:</span>
                                            <input className="text-field w-input br"
                                                   name="marka"
                                                   maxLength="256"
                                                   placeholder="М200 В15"
                                                   type="text"
                                                   value={mark}
                                                   onChange={(e) => setMark(e.target.value)}
                                            />
                                        </div>
                                        <div className="row-form">
                                            <span className="label-calk">Объём (м3):</span>
                                            <input className="text-field w-input br"
                                                   name="ob"
                                                   maxLength="256"
                                                   placeholder="Введите объём"
                                                   type="text"
                                                   value={volume}
                                                   onChange={(e) => setVolume(e.target.value)}
                                            />
                                        </div>
                                        <div className="row-form">
                                            <span className="label-calk">Телефон:</span>
                                            <InputMask className="text-field w-input br"
                                                       name="phone"
                                                       mask="+7 (999) 999-99-99"
                                                       placeholder="Введите телефон"
                                                       required
                                                       value={phone}
                                                       onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center mt-5">
                                            <button type="submit" className="btn org  main-btn form-btn">Рассчитать</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="contact-cart">
                            <div className="contact-row">
                                <img src="/images/icon/phone.svg" className="img-icon" alt="phone icon"/><span><a href="tel:+74951288380">+7 (495) 128-83-80</a></span>
                            </div>
                            <div className="contact-row">
                                <img src="/images/icon/message.svg" className="img-icon" alt="message icon"/><span><a
                                href={`mailto:info@glavsk.ru`}>info@glavsk.ru</a></span>
                            </div>
                            <div className="contact-row">
                                <img src="/images/icon/map.svg" className="img-icon" alt=""/><span className="adr">Пресненская наб., 8, стр. 1, Москва, Россия</span>
                            </div>
                        </div>
                    </div>
                </section>
            </>
            }
        </MainLayout>
    )
}

export const getServerSideProps = async () => {
    let catalogCategories = [];
    try {
        const res = await axios.get(`${API_URL}/product/getAllProduct`);
        catalogCategories = res.data;
    } catch (e) {
        console.log(e)
    }

    /*catalogCategories = REAL_FAKE_DATA;*/

    return {
        props: {
            catalogCategories,
        }
    }
};