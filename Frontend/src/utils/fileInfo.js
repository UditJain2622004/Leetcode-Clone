/** Info about languages, their id (in judg0 api), default file name and default code */

const files = {
  "script.py": {
    name: "script.py",
    language: "python",
    id: 71,
    value: `# READ INSTRUCTIONS BEFORE CODING.
    
# Write your code here`,
  },

  "main.c": {
    name: "main.c",
    language: "c",
    id: 48,
    value: `// READ INSTRUCTIONS BEFORE CODING.
    
#include <stdio.h>

int main() {
    // Write your code here

    return 0;
}`,
  },

  "main.cpp": {
    name: "main.cpp",
    language: "cpp",
    id: 52,
    value: `// READ INSTRUCTIONS BEFORE CODING.
    
#include <iostream>
using namespace std;

int main() {
    // Write your code here

  return 0;
}
`,
  },

  "main.java": {
    name: "main.java",
    language: "java",
    id: 62,
    value: `// READ INSTRUCTIONS BEFORE CODING.
    
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    Scanner myObj = new Scanner(System.in);
    // Write your code here
  }
}`,
  },
};

export default files;
