let logger = null
let store = null
let imgs = []
const fs = require('fs')
const path = require('path')
let options = []
fs.readdir(path.join(__dirname, "imgs"), (err, files) => {
	files.forEach(file => {
		let assetPath = "assets://mod/neko/imgs/" + file
		imgs.push(assetPath)
		options.push({value: assetPath, label: path.parse(file).name})
	})
})
module.exports = {
  title: "Neko",
  summary: "gives you a little friend",
  author: "GiovanH",
  modVersion: 0.1,

  trees: {
    "./": "assets://mod/neko/"
  },
  
  settings: {
    boolean: [{
      model: "random-image",
      label: "Randomize Image"
    }],
    radio: [{
      model: "image",
      label: "Image"
    }],
  },

  computed(api) {
    logger = api.logger	
	store = api.store
    store.set("random-image", store.get("random-image", true))
	store.set("image", store.get("image", imgs[0]))
  },

  vueHooks: [{
    matchName: "TabFrame",
    created() {
      this.nekoMod_hasNeko = false
    },
    updated() {
      this.$nextTick(() => {
		var img = store.get("random-image", true) 
		  ? imgs[Math.floor(Math.random() * imgs.length)] 
		  : store.get("image", imgs[0])
        if (!this.nekoMod_hasNeko) {
	      var x = document.createElement("IMG")
	      x.setAttribute("src", img)
	      x.setAttribute("id", "floating-buddy")
	      if (this.$el.nodeType === 8) return
	      this.$el.appendChild(x)
	    
             x.style.width = "100px"
	    
             x.style.position = "fixed"
             x.style.zIndex = "3"
	    
             x.style.bottom = "10px"
             x.style.right = "10px"
	    
             x.style.cursor = "grab"
             x.style.transform = "translate(-50%, -50%)" // center on cursor
	    
             x.addEventListener("dragstart", (event) => {
               const rect = x.getBoundingClientRect();
               x.style.transform = `translate(-${event.clientX - rect.left}px, -${event.clientY - rect.top}px)`
             })
             x.addEventListener("dragend", (event) => {
               x.style.top = event.clientY + 'px'
               x.style.left = event.clientX + 'px'
             })
             this.nekoMod_hasNeko = true
	     return
        }
	    let buddy = document.getElementById("floating-buddy")
	    buddy.setAttribute("src", img);
      })
    }
  }]
}
module.exports.settings.radio[0].options = options
