package sandbox;

import java.io.File;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class UniqueThreadPrintStream extends PrintStream {

    private final Map<Thread, PrintStream> map = new ConcurrentHashMap<>();

    private final PrintStream parent;

    static PrintStream std = null;

    public UniqueThreadPrintStream(OutputStream out) {
        super(out);
//        new File("out").mkdirs();
        map.put(Thread.currentThread(), std = parent = new PrintStream(out));
    }
    
    void register(SandboxTask caller){
        if (!map.containsKey(caller)) {
            try {
                map.put(caller, new PrintStream(caller.out));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    
    void unregister(SandboxTask caller){
        map.remove(caller);
    }

    private PrintStream out() {
        Thread call = thread();
        if (!(call instanceof SandboxTask)) {
            return parent;
        }
//        parent.println(caller);
        
        register((SandboxTask)call);
        return map.get(call);
    }

    private Thread thread() {
        return Thread.currentThread();
    }

    @Override
    public void flush() {
        out().flush();
    }

    @Override
    public void close() {
        synchronized (this) {
            super.close();
            for (PrintStream stream : map.values()) {
                stream.close();
            }
        }
    }

    @Override
    public void write(int b) {
        out().write(b);
    }

    @Override
    public void write(byte buf[], int off, int len) {
        out().write(buf, off, len);
    }

    @Override
    public void print(boolean b) {
        out().print(b ? "true" : "false");
    }

    @Override
    public void print(char c) {
        out().print(String.valueOf(c));
    }

    @Override
    public void print(int i) {
        out().print(String.valueOf(i));
    }

    @Override
    public void print(long l) {
        out().print(String.valueOf(l));
    }

    @Override
    public void print(float f) {
        out().print(String.valueOf(f));
    }

    @Override
    public void print(double d) {
        out().print(String.valueOf(d));
    }

    @Override
    public void print(char s[]) {
        out().print(s);
    }

    @Override
    public void print(String s) {
        if (s == null) {
            s = "null";
        }
        out().print(s);
    }

    @Override
    public void print(Object obj) {
        out().print(String.valueOf(obj));
    }

    private void newLine() {
        out().println();
    }

    @Override
    public void println() {
        newLine();
    }

    @Override
    public void println(boolean x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(char x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(int x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(long x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(float x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(double x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(char x[]) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(String x) {
        synchronized (this) {
            print(x);
            newLine();
        }
    }

    @Override
    public void println(Object x) {
        String s = String.valueOf(x);
        synchronized (this) {
            print(s);
            newLine();
        }
    }

    @Override
    public PrintStream printf(String format, Object... args) {
        return format(format, args);
    }

    @Override
    public PrintStream printf(Locale l, String format, Object... args) {
        return format(l, format, args);
    }

    @Override
    public PrintStream format(String format, Object... args) {
        return out().format(format, args);
    }

    @Override
    public PrintStream format(Locale l, String format, Object... args) {
        return out().format(l, format, args);
    }

    @Override
    public PrintStream append(CharSequence csq) {
        if (csq == null) {
            print("null");
        } else {
            print(csq.toString());
        }
        return this;
    }

    @Override
    public PrintStream append(CharSequence csq, int start, int end) {
        return out().append(csq, start, end);
    }

    @Override
    public PrintStream append(char c) {
        print(c);
        return this;
    }

}
