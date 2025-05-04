import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}
  outputElement!: HTMLElement | null;

  ngOnInit() {}

  ngAfterViewInit() {
    this.outputElement = document.getElementById('output');
    this.displayText([
      '> Welcome to my portfolio.',
      "> Type 'help' to see available commands.",
    ]);
  }

  displayText(lines: string[]) {
    if (!this.outputElement) {
      this.outputElement = document.getElementById("output"); // Reassign if null
      if (!this.outputElement) return; // Still null? Exit function
    }
  
    let index = 0;
    let textIndex = 0;
  
    const typeText = () => {
      if (index < lines.length) {
        if (textIndex < lines[index].length) {
          this.outputElement!.innerHTML += lines[index].charAt(textIndex); // Use '!' since we ensured it's not null
          textIndex++;
          setTimeout(typeText, 40);
        } else {
          this.outputElement!.innerHTML += "<br>";
          index++;
          textIndex = 0;
          setTimeout(typeText, 300);
        }
      }
    };
  
    typeText();
  }
  

  processCommand(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const command = inputElement.value.trim().toLowerCase();
    inputElement.value = '';

    if (!this.outputElement) return;
    this.outputElement.innerHTML += `<br><span class="prompt">visitor@portfolio:~$</span> ${command}<br>`;

    switch (command) {
      case 'help':
        this.displayText([
          '> Available commands:',
          "> 'about' - Learn about me.",
          "> 'projects' - View my projects.",
          "> 'contact' - Get in touch.",
        ]);
        break;

      case 'about':
        this.displayText([
          '> I am a Full-Stack Developer specializing in Angular & Laravel.',
          '> Passionate about coding and solving complex problems.',
        ]);
        break;

      case 'projects':
        this.displayText([
          '> Project 1: AI-Powered Search System',
          '> - Built using Angular & Laravel.',
          '> Project 2: Real-time Chat App',
          '> - Uses WebSockets & Firebase.',
          '> Project 3: Portfolio with Terminal UI',
          "> - The one you're viewing right now!",
        ]);
        break;

      case 'contact':
        this.displayText([
          '> Email: vaidehi@example.com',
          '> LinkedIn: linkedin.com/in/vaidehi',
          '> GitHub: github.com/vaidehi',
        ]);
        break;

      default:
        this.displayText([
          `> Command '${command}' not found. Type 'help' for a list of commands.`,
        ]);
    }
  }
}
