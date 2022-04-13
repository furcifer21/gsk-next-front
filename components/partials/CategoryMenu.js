import Link from "next/link";

export default function CategoryMenu({categories, pageSlug}) {
    return (
        <div className="col-sidbar-left">
            <div className="sidbar-left-name"><img src="/images/icon/widget.svg" alt=""/>Каталог</div>
            {/* <div className="sidbar-left-item active br">Товарный бетон</div> */}
            <div>
                {categories.map((category, index) => {
                    return (
                        <div key={`category-item-${index}`} className={`sidbar-left-item br w-100 position-relative ${pageSlug === category.typeSlug ? 'active' : ''}`}>
                            <Link href={`/catalog/${category.typeSlug}`}><a className="fake-link-block"></a></Link>
                            {category.type}
                        </div>
                    )
                })}
            </div>
            {/*<div className={`sidbar-left-item br position-relative ${pageSlug === '/calculate' ? 'active' : ''}`}>
                <Link href="/calculate"><a className="fake-link-block"></a></Link>
                Рассчитать стоимость доставки
            </div>*/}
        </div>
    )
}