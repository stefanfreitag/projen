import { Construct } from 'constructs';
import { File } from './file';
import * as YAML from 'yaml';

export interface GithubWorkflowOptions {
  /**
   * @default - same as name
   */
  readonly name?: string;
}

export class GithubWorkflow extends File {

  private readonly name: string;
  private events: { [event: string]: any } = { };
  private jobs: { [jobid: string]: any } = { };

  constructor(scope: Construct, name: string, options: GithubWorkflowOptions = { }) {
    super(scope, `.github/workflows/${name}.yml`);
    
    this.name = options.name ?? name;
  }

  public on(events: { [event: string]: any }) {
    this.events = {
      ...this.events,
      ...events,
    };
  }

  public addJobs(jobs: { [jobid: string]: any }) {
    this.jobs = {
      ...this.jobs,
      ...jobs,
    };
  }

  public get data() {
    const workflow = {
      name: this.name,
      on: this.events,
      jobs: this.jobs,
    };

    return YAML.stringify(workflow);
  }
}