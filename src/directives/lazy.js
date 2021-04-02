import bus from '@/bus.js'
import { debounce } from '@/utils'
import defaultGif from "@/assets/default.gif";

let imgs = []
bus.$on('mainScroll', debounce(handleScroll, 50))

function setImage(img) {
    img.dom.src = defaultGif//添加上默认图片
    const rect = img.dom.getBoundingClientRect()
    const clientHeight = document.documentElement.clientHeight
    const height = rect.height || 150;
    if (rect.top <= clientHeight && rect.top >= -height) {
        //当出现在可视区域
        img.dom.src = img.src
        imgs = imgs.filter(o => o !== img)
    }
}

//调用该函数，就可以设置那些合适的图片
function setImages() {
    for (const img of imgs) {
        // 处理该图片
        setImage(img)
    }
}


function handleScroll() {
    setImages()
}

export default {
    inserted(el, bindings) {
        let img = {
            dom: el,
            src: bindings.value
        }
        imgs.push(img)
        //立即处理，不然第一次没滚动会不触发
        setImage(img)
    },
    unbind(el) {
        imgs = imgs.filter((img) => img.dom !== el);
    },
}