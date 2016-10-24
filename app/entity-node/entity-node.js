"use strict";
var EntityNode = (function () {
    function EntityNode(fetch_url, children_count, instance_count, mention_count, name, type, url, id) {
        this.fetch_url = fetch_url;
        this.children_count = children_count;
        this.instance_count = instance_count;
        this.mention_count = mention_count;
        this.name = name;
        this.type = type;
        this.url = url;
        this.id = id;
        this.showIcon = false;
        this.expanded = false;
        this.icon = null;
        if (children_count > 0) {
            this.showIcon = true;
            this.icon = this.getIcon();
        }
    }
    EntityNode.prototype.expand = function () {
        this.expanded = !this.expanded;
        this.icon = this.getIcon();
    };
    EntityNode.prototype.getIcon = function () {
        if (this.showIcon === true) {
            if (this.expanded) {
                return '- ';
            }
            return '+ ';
        }
        return null;
    };
    return EntityNode;
}());
exports.EntityNode = EntityNode;
//# sourceMappingURL=entity-node.js.map