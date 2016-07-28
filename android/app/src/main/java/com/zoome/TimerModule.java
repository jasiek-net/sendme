
package com.zoome;

import android.telecom.Call;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

public class TimerModule extends ReactContextBaseJavaModule {
    Timer timer = null;

    public TimerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    class Task extends TimerTask {
        Callback task;

        Task(Callback task) {
            this.task = task;
        }

        public void run() {
            this.task.invoke();
            timer.cancel();
        }
    }

    @ReactMethod
    public void startTimer(Integer delay, Callback task) {
        if (timer == null) {
            Calendar today = Calendar.getInstance();
            today.set(Calendar.HOUR_OF_DAY, 2);
            today.set(Calendar.MINUTE, 0);
            today.set(Calendar.SECOND, 0);

            timer = new Timer();
//            timer.schedule(new Task(task), today.getTime(), TimeUnit.MILLISECONDS.convert(1, TimeUnit.DAYS));
            timer.schedule(new Task(task), delay);

//            timer.cancel();
//            timer.purge();
        }
    }

    @Override
    public String getName() {
        return "TimerModule";
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }



}

