
import java.lang.ProcessBuilder.Redirect;


/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class Main {

    public static void main(String[] args) throws Exception {
        
        String jhome = System.getenv("JAVA_HOME");
        
        ProcessBuilder builder = new ProcessBuilder(jhome+"/bin/java.exe", "-jar", "C:/users/natha/documents/github/Compete-Engine/Worker/Java Compiler/dist/Java_Compiler.jar");
        
        builder.redirectError(Redirect.INHERIT);
        builder.redirectOutput(Redirect.INHERIT);
        builder.redirectInput(Redirect.INHERIT);
        
        
        builder.environment().put("test", "works!");

        
        builder.start();
        
        
    }

}
