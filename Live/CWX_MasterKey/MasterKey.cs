﻿using BepInEx;

namespace CWX_MasterKey
{
    [BepInPlugin("com.CWX.MasterKey", "CWX-MasterKey", "1.3.8")]
    public class MasterKey : BaseUnityPlugin
    {
        private void Awake()
        {
            new MasterKeyPatch().Enable();
        }
    }
}
