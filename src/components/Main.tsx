import { useEffect  } from 'react';
import '../sass/components/_main.scss';
import { useContext } from "react";
import { DataContext } from "./context";
type MainProps = {
    message: string;
}

function Main({message}: MainProps){
    const language = useContext(DataContext);

    useEffect(() => {
        var isScrolling = false;
        const onScroll: EventListener = (event: Event) => { // <-- DOM-EventListener
            if (isScrolling === false ) {
                window.requestAnimationFrame(function() {
                  dealWithScrolling();
                  isScrolling = false;
                });
            }
            isScrolling = true;
        };
        function dealWithScrolling() {
            // do epic stuff    
            //console.log("event", e.target);
            const li = document.querySelectorAll("li");
            //console.log(li);
            li.forEach(d=> {
                const full = isFullyVisible(d);
                const partial = isPartiallyVisible(d);
                //console.log(full, partial);
                if(full){
                    d.classList.add("li-active-scroll");
                }else{
                    d.classList.remove("li-active-scroll");
                }
                // if(partial){
                //     d.classList.add("li-active-scroll-partial");
                // }else{
                //     d.classList.remove("li-active-scroll-partial");
                // }
            });
        }

        function isFullyVisible(el: any) {
            var elementBoundary = el.getBoundingClientRect();
            var top = elementBoundary.top;
            var bottom = elementBoundary.bottom;
            return ((top >= 0) && (bottom <= window.innerHeight));
          }

        function isPartiallyVisible(el: any) {
            var elementBoundary = el.getBoundingClientRect();
         
            var top = elementBoundary.top;
            var bottom = elementBoundary.bottom;
            var height = elementBoundary.height;
         
            return ((top + height >= 0) && (height + window.innerHeight >= bottom));
        }
        //const win: Window = window;   // <-- DOM-Window, extends DOM-EventTarget
        window.addEventListener("scroll", onScroll);
        dealWithScrolling();
    
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return(
        <div className="container-sm">
            <div className='title-page'>
                {language.main_page_title}
            </div>
            <ul className="ol-action" >
                <li>
                    {language.main_page_list_1}
                </li>
                <li>
                    {language.main_page_list_2}
                </li>
                <li>
                    {language.main_page_list_3}
                </li>
                <li>
                    {language.main_page_list_4}
                </li>
                <li>
                    {language.main_page_list_5}
                </li>
                <li>{language.main_page_list_6}</li>
            </ul>
        </div>
    );
}
export default Main;