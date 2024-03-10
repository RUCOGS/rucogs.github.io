export class ProcessMonitor {
  processes: string[] = [];

  get isProcessing() {
    return this.processes.length > 0;
  }

  constructor() {}

  addProcess(name: string = '') {
    this.processes.push(name);
  }

  removeProcess(name: string = '') {
    if (name) {
      const index = this.processes.indexOf(name);
      if (index > -1) {
        this.processes = this.processes.splice(index, 1);
      }
    } else {
      this.processes.pop();
    }
  }

  clearProcesses() {
    this.processes.length = 0;
  }
}
