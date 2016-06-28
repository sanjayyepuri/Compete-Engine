package sandbox;

import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.lang.reflect.Method;
import javax.tools.ToolProvider;
import org.mdkt.compiler.InMemoryJavaCompiler;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class SandboxTask extends Thread {

    private Method main;
    boolean error = false;
    private static boolean javapath = ToolProvider.getSystemJavaCompiler() != null;
    private SandboxEventListener listener;
    final OutputStream out;
    final int id;

    SandboxTask(String src, SandboxEventListener listener, int id) {
        super();
        this.listener = listener;
        this.id = id;
        out = new ByteArrayOutputStream();
        if (!javapath) {
            throw new IllegalStateException("No java path set! Files will not compile!");
        }

        int bracecount = 0;
        int dex = 0;

        while (true) {
            if (dex >= src.length() || !src.substring(dex).contains("class")) {
                error = true;
                return;
            }
            String curr = src.substring(dex);
//            System.out.println(dex);
            if (curr.startsWith("public") && curr.substring(0, curr.indexOf("class") + 6)
                    .matches("public\\s+class\\s") && bracecount == 0) {

                break;
            }
            if (src.charAt(dex) == '{') {
                bracecount++;
            }
            if (src.charAt(dex) == '}') {
                bracecount--;
            }
            dex++;

        }

        dex = src.substring(dex).indexOf("class") + 5 + dex;
        while (Character.isWhitespace(src.charAt(dex))) {
            dex++;
        }

        int dex2 = dex;
        while (!Character.isWhitespace(src.charAt(dex2)) && !(src.charAt(dex2) == '{')) {
            dex2++;
        }

        String classname = src.substring(dex, dex2);
        System.out.println("Loaded class " + classname);

        try {
            Class clazz = InMemoryJavaCompiler.compile(classname, src);
            main = clazz.getDeclaredMethod("main", String[].class);

        } catch (Throwable t) {
//            t.printStackTrace();
            error = true;
        }

    }

    @Override
    public void run() {

        try {
            if (error) {
                System.out.println("error");
                return;
            }
            try {
                main.invoke(null, (Object) null);
            } catch (Exception e) {
                error = true;
                e.printStackTrace(System.out);
            }
        } finally {
            synchronized (listener) {
                listener.notifyAll();
            }
            listener.event(new SandboxEvent(this));
        }
    }

    public static void setJavaPath(String path) throws IllegalArgumentException {
        System.setProperty("java.home", path);
        if (javapath = (ToolProvider.getSystemJavaCompiler() != null)) {

            System.out.println("java home successfully set");
        } else {
            throw new IllegalArgumentException("Invalid java home");
        }
    }

}
