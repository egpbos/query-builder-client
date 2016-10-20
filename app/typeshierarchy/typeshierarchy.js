"use strict";
var TypesHierarchy = (function () {
    function TypesHierarchy(children, instance_count, instances, mention_count, name, type, url) {
        this.children = children;
        this.instance_count = instance_count;
        this.instances = instances;
        this.mention_count = mention_count;
        this.name = name;
        this.type = type;
        this.url = url;
        this.showIcon = false;
        this.expanded = false;
        this.icon = null;
        if (children.length !== 0) {
            this.showIcon = true;
            this.icon = this.getIcon();
        }
    }
    TypesHierarchy.prototype.expand = function () {
        this.expanded = !this.expanded;
        this.icon = this.getIcon();
    };
    TypesHierarchy.prototype.getIcon = function () {
        if (this.showIcon === true) {
            if (this.expanded) {
                return '- ';
            }
            return '+ ';
        }
        return null;
    };
    return TypesHierarchy;
}());
exports.TypesHierarchy = TypesHierarchy;
//# sourceMappingURL=typeshierarchy.js.map