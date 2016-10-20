import { Instance }  from '../instance/instance';

export class TypesHierarchy {
  private showIcon = false;
  private expanded = false;
  private icon = null;

  constructor(
    public children: TypesHierarchy[],
    public instance_count: number,
    public instances: Instance[],
    public mention_count: number,
    public name: string,
    public type: string,
    public url: string
  ) {
    if (children.length !== 0) {
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