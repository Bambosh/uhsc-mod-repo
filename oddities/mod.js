let logger = null
let store = null

function replaceContent(story, key, pat, repl){
    story[key].content = story[key].content.replace(pat, repl)
}

module.exports = {
    title: "UHC Oddities", 
    summary: "Features and tweaks that are too weird for settings",
    author: "GiovanH",
    modVersion: 0.1,

    computed(api) { 
        logger = api.logger
        store = api.store
    },

    edit(archive) {
        if (store.get("calliope")) {
            archive.mspa.story['006997'].content = `<p style=" font-weight: bold; font-family: courier, monospace;color:#000000">
            [Author's note:<br><br>Let's avoid posting spoiler images all over tumblr, just this once?<br>
            <br>If you absolutely MUST proliferate an image, <a href="/storyfiles/hs2/scraps/calliope.gif" target="_blank" class="postlink">please post this instead</a>.]
            </p>`
        }
        if (store.get("no2009")) {
            replaceContent(archive.mspa.story, '001901', "April, 2009,", "April,")
        }
        if (store.get("whiterapper")) {
            replaceContent(archive.mspa.story, '002286', "being a white guy who is a rapper", "being a Íæûë€Å guy who is a rapper")
        }
    },

    vueHooks: [{
        // same as match(c) {return c.$options.name == "pageText"}
        matchName: "log",
        computed: {
            adventureLinks($super) {
                // Todo: properly insert links into arbitrary super
                if (store.get("ryanlogs")) {
                    return [
                        {href: "/log/1", img: "/images/archive_jb.gif", label: "Jailbreak"},
                        {href: "/log/2", img: "/images/archive_bq.gif", label: "Bard Quest"},
                        {href: "/log/4", img: "/images/archive_ps.gif", label: "Problem Sleuth"},
                        {href: "/log/5", img: "/images/archive_beta.gif", label: "Homestuck Beta"},
                        {href: "/log/6", img: "/images/archive_hs.gif", label: "Homestuck"},
                        {href: "/log/ryanquest", img: "/images/archive_rq.png", label: "Ryanquest"}
                    ]
                } else return $super
            }
        }
    }],

    settings: {
        boolean: [{
            model: "ryanlogs",
            label: "Show Extra Logs",
            desc: "Include buttons for side adventures under <code>/logs</code>"
        },{
            model: "calliope",
            label: "Show Author Note",
            desc: "Show author note on <a href='/mspa/006997'>p=006997</a>"
        },{
            model: "no2009",
            label: "No 2009",
            desc: "Reverses the date retcon on the first page of Homestuck"
        },{
            model: "whiterapper",
            label: "Íæûë€Å",
            desc: "Ends racism. (See <a href='/tumblr/iaeu-eeura'>/tumblr/iaeu-eeura</a> for commentary)"
        }]
    }
}