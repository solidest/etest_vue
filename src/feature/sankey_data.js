/**
 * 数据合并桑基树
 */

const styles = [{
        "normal": {
            "color": "#f18bbf",
            "borderColor": "#f18bbf"
        }
    },
    {
        "normal": {
            "color": "#72A376",
            "borderColor": "#72A376"
        }
    },
    {
        "normal": {
            "color": "#69797E",
            "borderColor": "#69797E"
        }
    },
    {
        "normal": {
            "color": "#3891A7",
            "borderColor": "#3891A7"
        }
    },
    {
        "normal": {
            "color": "#0037DA",
            "borderColor": "#0037DA"
        }
    },
    {
        "normal": {
            "color": "#C0BEAF",
            "borderColor": "#C0BEAF"
        }
    },
    {
        "normal": {
            "color": "#EA005E",
            "borderColor": "#EA005E"
        }
    },
    {
        "normal": {
            "color": "#D13438",
            "borderColor": "#D13438"
        }
    },
    {
        "normal": {
            "color": "#567C73",
            "borderColor": "#567C73"
        }
    },
    {
        "color": "#9ed566",
        "borderColor": "#9ed566"
    }
];


class SankeyData {


    constructor() {
        this._data = [];
        this._links = [];
    }

    //追加树
    pushTree(tree) {
        for (let n of tree) {
            // console.log(n)
            this._data.push(n);
            if (n.children && n.children.length > 0) {
                for (let nn of n.children) {
                    nn.$parent = n;
                    this._links.push({
                        from: n,
                        to: nn
                    });
                }
                this.pushTree(n.children);
            }
        }
    }

    //更新权重
    _updateValue(node) {
        if (node.$value) {
            return;
        }
        if (!node.$parent) {
            node.$value = node.value;
            return;
        }
        if (!node.$parent.$value) {
            this._updateValue(node.$parent);
        }
        let chs = node.$parent.children;
        let t = 0;
        for (let n of chs) {
            t += n.value;
        }
        if (t === 0) {
            node.$value = 0;
            return;
        }
        node.$value = node.$parent.$value * (node.value / t);
    }


    //合并节点
    _mergeNodes() {

        let ns = [];
        for (let n of this._data) {
            let f = ns.find(it => it.name === n.name);
            if (!f) {
                let idx = ns.length;
                if (idx > styles.length) {
                    idx = idx % styles.length;
                }
                ns.push({
                    name: n.name,
                    itemStyle: styles[idx]
                });
            }
        }
        this.data = ns;
    }

    //合并连接
    _mergeLinks() {
        let links = [];
        for (let l of this._links) {
            let f = links.find(it => l.from.name === it.source && l.to.name === it.target);
            if (f) {
                f.value += l.to.$value;
            } else {
                links.push({
                    source: l.from.name,
                    target: l.to.name,
                    value: l.to.$value
                });
            }
        }
        this.links = links;
    }

    //合并树
    mergeTree() {
        for (let n of this._data) {
            this._updateValue(n);
        }
        this._mergeNodes();
        this._mergeLinks();
    }

}

export default SankeyData