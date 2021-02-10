using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConsolePause : MonoBehaviour
{
    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown("escape")) {
            switch(Time.timeScale) {
                case 0:
                    Time.timeScale = 1;
                    break;
                case 1:
                    Time.timeScale = 0;
                    break;
            }

            Debug.Log("Time-Scale now at: " + Time.timeScale);
        }
    }
}
