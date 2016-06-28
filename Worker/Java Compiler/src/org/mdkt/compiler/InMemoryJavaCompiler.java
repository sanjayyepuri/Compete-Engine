package org.mdkt.compiler;

import java.net.URL;
import java.net.URLClassLoader;
import javax.tools.JavaCompiler;
import javax.tools.JavaFileObject;
import javax.tools.ToolProvider;
import java.util.Arrays;

/**
 * Created by trung on 5/3/15.
 */
public class InMemoryJavaCompiler {

    static JavaCompiler javac = ToolProvider.getSystemJavaCompiler();

    public static Class<?> compile(String className, String sourceCodeInText) throws Exception {
        SourceCode sourceCode = new SourceCode(className, sourceCodeInText);
        CompiledCode compiledCode = new CompiledCode(className);
        Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(sourceCode);
        try (URLClassLoader temp = new URLClassLoader(new URL[0])) {
            DynamicClassLoader cl = new DynamicClassLoader(temp);
            ExtendedStandardJavaFileManager fileManager = new ExtendedStandardJavaFileManager(javac.getStandardFileManager(null, null, null), compiledCode, cl);
            JavaCompiler.CompilationTask task = javac.getTask(null, fileManager, null, null, null, compilationUnits);
            boolean result = task.call();
            return cl.loadClass(className);
        }

    }
}
