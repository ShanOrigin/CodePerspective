import InitAnimation from '../../../../__initAnimation__'
import CodeSwiper from './CodeEditor'

export default function Animation({ name }) {

  const code = {
    C: {
      language: 'c_cpp',
      code: `
 #include <stdio.h>

 int main(int argc, char *argv[]) {
   int input;printf("Enter value: ");
   scanf("%d", &input);
 }
       `,
    },
    'C++': {
      language: 'c_cpp',
      code: `
 #include <stdio.h>

         int main(int argc, char *argv[]) {
           int input;
           printf("Enter value: ");
           scanf("%d", &input);
         }
       `,
    },
    Python: {
      language: 'python',
      code: `
         input_value = int(input("Enter value: "))
         print(f"You entered: {input_value}")
       `,
    },
    Java: {
      language: 'java',
      code: `                                                                
			   import java.util.Scanner;

         public class Main {
           public static void main(String[] args) {
             Scanner scanner = new Scanner(System.in);
             System.out.print("Enter value: ");
             int input = scanner.nextInt();
             System.out.println("You entered: " + input);
           }
         }
       `,
    },
    JavaScript: {
      language: 'javascript',
      code: `
         const input = prompt("Enter value:");
         console.log(\`You entered: \${input}\`);
       `,
    },
    CSharp: {
      language: 'csharp',
      code: `
         using System;

         class Program {
           static void Main(string[] args) {
             Console.Write("Enter value: ");
             int input = int.Parse(Console.ReadLine());
             Console.WriteLine($"You entered: {input}");
           }
         }
       `,
    },
  }

  return (
    <>
      <div className="animation-section ">
        <div className="animation-area">
          <InitAnimation
            key={`${location.pathname}?${location.search}`}
            aniName={name}
          />
        </div>
        <div className="code-area">
          <CodeSwiper code={code} />
        </div>
      </div>
    </>
  )
}
