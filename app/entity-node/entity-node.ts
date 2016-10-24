import { EntityInstance }  from '../entity-instance/entity-instance';

export class EntityNode {
  private showIcon = false;
  private expanded = false;
  private icon = null;

  constructor(
    public fetch_url: string,
    public children_count: number,
    public instance_count: number,    
    public mention_count: number,
    public name: string,
    public type: string,
    public url: string,
    public id: number
  ) {
    if (children_count > 0) {
      this.showIcon = true;
      this.icon = this.getIcon();
    }
  }

  expand() {
    this.expanded = !this.expanded;
    this.icon = this.getIcon();
  }

  private getIcon() {
    if (this.showIcon === true) {
      if (this.expanded) {
        return '- ';
      }
      return '+ ';

    }
    return null;
  }
}