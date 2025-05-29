import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[dndDirectives]',
  standalone: true
})
export class DndDirective {
  // emit события для компонента (что были изменения)
  @Output() fileDropped = new EventEmitter<File>();

  // меняем класс при перетаскивании
  @HostBinding('class.fileover')

  fileover = false;

  // события для перетаскивания объекта
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.fileover = false;
    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
