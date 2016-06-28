package sandbox;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.PrintStream;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class Main {

    @SuppressWarnings("CallToPrintStackTrace")
    public static void main(String[] args) throws Exception{

        PrintStream out = System.out;

        System.out.println(System.getenv("test"));

        //UniqueThreadPrintStream stream = new UniqueThreadPrintStream(System.out);
//        System.setOut(stream);

        String src = "import java.util.*;\n"
                + "public class Tester{\n"
                + "  public static void main(String[] args){\n"
                + "      Scanner yo = new Scanner(System.in);\n"
                + "      System.out.println(\"hello world\");\n"
                + "      System.out.println(yo.nextLine());\n"
                + "      System.out.println(System.getenv(\"test\"));\n"
                + "  }\n"
                + "}";
        
        String input = "this is a test lol\nwat";
        int id = -1;
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String token = "token";

        SandboxEventListener listener = new gay();

        SandboxTask task = new SandboxTask(src, listener, id);

        System.setOut(new PrintStream(task.out));
        System.setIn(new BufferedInputStream(new ByteArrayInputStream(input.getBytes())));

        out.println("good");
        System.setSecurityManager(new SandboxSecurityManager());
        task.start();
        try {
            synchronized (listener) {
                listener.wait(2 * 1000);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        task.stop();

        CompeteResponse res = new CompeteResponse();
        res.response = new SandboxEvent(task).getResponse();
        res.token = token;

        out.println(gson.toJson(res));
        send(res);

    }

    static void send(Object o) {

    }

}

class CompeteResponse {

    public CompileResponse response;
    public String token;

}

class gay implements SandboxEventListener{

    @Override
    public void event(SandboxEvent event) {
        
    }
    
}