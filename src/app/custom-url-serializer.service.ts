import { Injectable } from '@angular/core';
import { UrlSerializer, DefaultUrlSerializer, UrlTree, UrlSegment, PRIMARY_OUTLET } from '@angular/router';

@Injectable()
export class CustomUrlSerializer implements UrlSerializer {
  /** Parses a url into a {@link UrlTree} */
  private defaultSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  /** Parses a url into a {@link UrlTree} */
  parse(url: string): UrlTree {

    // const equals = [];
    // url.split('').forEach((c, i) => {
    //     if(c != '=') return;
    //     equals.push(i);
    // });

    console.log(`url: '${url}'`);
    // url = url.replace(/=/g, '-');
    let urlTree = this.defaultSerializer.parse(url);
    let group = urlTree.root.children[PRIMARY_OUTLET];
    if(!group) return urlTree;
    let segment = group.segments[0].path.replace(/_/g, '=');
    console.log(segment);
    group.segments[0].path = segment;
    console.log(urlTree);
    return urlTree;

    // // This is the custom patch where you'll collect segment containing '='
    // const lastSlashIndex = url.lastIndexOf('/');
    // const equalSignIndex = url.indexOf('=');
    // if (equalSignIndex > -1) { // url contians '=', apply patch
    //   const keyValArr = url.substr(lastSlashIndex + 1).split('=');
    //   const urlTree = this.defaultSerializer.parse(url);

    //   // Once you have serialized urlTree, you have two options to capture '=' part
    //   // Method 1. replace desired segment with whole "key=val" as segment
    //   urlTree.root.children['primary'].segments.forEach((segment: UrlSegment) => {
    //     if (segment.path === keyValArr[0]) {
    //       segment.path = keyValArr.join('='); // Suggestion: you can use other unique set of characters here too e.g. '$$$'
    //     }
    //   });

    //   // Method 2. This is the second method, insert a custom query parameter
    //   // urlTree.queryParams[keyValArr[0]] = keyValArr[1];
    //   return urlTree;
    // } else {
    //   // return as usual
    //   return this.defaultSerializer.parse(url);
    // }
  }

  /** Converts a {@link UrlTree} into a url */
  serialize(tree: UrlTree): string {
    return this.defaultSerializer.serialize(tree);
  }
}